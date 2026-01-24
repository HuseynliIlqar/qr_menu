// customer_push.js (module)

console.log("[customer_push] loaded");

window.addEventListener("error", (e) => {
  console.error("[customer_push] error:", e.message, e.filename, e.lineno);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("[customer_push] promise:", e.reason);
});

const els = {
  fab: document.getElementById("call-fab"),
  modal: document.getElementById("call-modal"),
  close: document.getElementById("call-close"),
  qr: document.getElementById("call-qr"),
  code: document.getElementById("call-code"),
  enablePush: document.getElementById("call-enable-push"),
  refresh: document.getElementById("call-refresh"),
  note: document.getElementById("call-note"),
};

let currentOrder = null;

const VAPID_PUBLIC_KEY = window.__VAPID_PUBLIC_KEY__ || "";
const SW_URL = window.__SW_URL__ || "/static/sw.js";

function getCookie(name) {
  const row = document.cookie.split("; ").find(r => r.startsWith(name + "="));
  return row ? decodeURIComponent(row.split("=")[1]) : null;
}
const CSRF_TOKEN = window.__CSRF_TOKEN__ || getCookie("csrftoken") || "";

// Persist
const ORDER_STORAGE_KEY = "qrmenu_customer_call_order_v1";
const ORDER_TTL_MS = 1000 * 60 * 30;

function setNote(msg) {
  if (els.note) els.note.textContent = msg || "";
}

function openModal() {
  els.modal?.classList.add("active");
  els.modal?.setAttribute("aria-hidden", "false");
}

function closeModal() {
  els.modal?.classList.remove("active");
  els.modal?.setAttribute("aria-hidden", "true");
}

function saveOrderToStorage(order) {
  localStorage.setItem(
    ORDER_STORAGE_KEY,
    JSON.stringify({ ...order, saved_at: Date.now() })
  );
}

function loadOrderFromStorage() {
  try {
    const raw = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);

    if (!obj.saved_at || Date.now() - obj.saved_at > ORDER_TTL_MS) {
      localStorage.removeItem(ORDER_STORAGE_KEY);
      return null;
    }

    if (!obj.order_id || !obj.order_code || !obj.customer_token) return null;
    return obj;
  } catch {
    return null;
  }
}

function clearOrderStorage() {
  localStorage.removeItem(ORDER_STORAGE_KEY);
}

async function createOrder() {
  const res = await fetch("/orders/create/", {
    method: "POST",
    headers: {
      "X-CSRFToken": CSRF_TOKEN,
      "Content-Type": "application/json",
    },
    body: "{}",
    credentials: "same-origin",
  });
  if (!res.ok) throw new Error(`Order create failed: ${res.status}`);
  return await res.json(); // {order_id, order_code, customer_token}
}

function renderQR(payloadText) {
  if (!els.qr) return;
  els.qr.innerHTML = "";
  if (typeof QRCode === "undefined") throw new Error("QRCode library not loaded");
  new QRCode(els.qr, { text: payloadText, width: 220, height: 220 });
}

function renderFromOrder(order, noteText) {
  currentOrder = order;

  if (els.code) els.code.textContent = currentOrder.order_code || "-----";

  const qrPayload = JSON.stringify({
    order_code: currentOrder.order_code,
    customer_token: currentOrder.customer_token,
  });

  renderQR(qrPayload);
  setNote(noteText || "QR hazırdır. Kassirə göstərin.");
}

async function initOrderAndQR({ forceNew = false } = {}) {
  setNote("QR hazırlanır...");

  if (!forceNew) {
    const cached = loadOrderFromStorage();
    if (cached) {
      renderFromOrder(cached, "Əvvəlki QR bərpa olundu. Kassirə göstərin.");
      return;
    }
  }

  const fresh = await createOrder();
  saveOrderToStorage(fresh);
  renderFromOrder(fresh, "Yeni QR hazırdır. Kassirə göstərin.");
}

async function registerSW() {
  if (!("serviceWorker" in navigator)) throw new Error("SW not supported");

  console.log("[customer_push] registering SW:", SW_URL);

  const reg = await navigator.serviceWorker.register(SW_URL);
  console.log("[customer_push] SW registered scope:", reg.scope);

  // dev-də köhnə SW qalıbsa update faydalıdır
  try { await reg.update(); } catch {}

  return reg;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function subscribePush() {
  if (!currentOrder) throw new Error("Order yoxdur");

  if (!VAPID_PUBLIC_KEY) {
    setNote("VAPID_PUBLIC_KEY boşdur. Template-də inject olunmayıb.");
    return;
  }

  const perm = await Notification.requestPermission();
  console.log("[customer_push] permission:", perm);

  if (perm !== "granted") {
    setNote("Bildiriş icazəsi verilmədi. QR işləyir, sadəcə push gəlməyəcək.");
    return;
  }

  // ✅ 1-ci variant: ready YOX, register-in verdiyi reg ilə işləyirik.
  const reg = await registerSW();

  // Əgər SW_URL 404 olarsa burada partlayacaq, yaxşı da eləyəcək.
  if (!reg.pushManager) throw new Error("pushManager yoxdur (SW problemi).");

  const existing = await reg.pushManager.getSubscription();
  const sub = existing || await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  const body = sub.toJSON();
  console.log("[customer_push] subscription json:", body);

  const res = await fetch(`/orders/${currentOrder.order_id}/push/subscribe/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    },
    body: JSON.stringify(body),
    credentials: "same-origin",
  });

  console.log("[customer_push] subscribe response:", res.status);
  if (!res.ok) throw new Error(`Subscription save failed: ${res.status}`);

  setNote("Bildirişlər aktivdir. Kassir çağıranda push gələcək.");
}

// Events
els.fab?.addEventListener("click", async () => {
  openModal();
  try {
    await initOrderAndQR({ forceNew: false });
  } catch (e) {
    setNote("Xəta: QR yaradıla bilmədi.");
    console.error(e);
  }
});

els.close?.addEventListener("click", closeModal);

els.modal?.addEventListener("click", (e) => {
  if (e.target === els.modal) closeModal();
});

els.refresh?.addEventListener("click", async () => {
  try {
    clearOrderStorage();
    await initOrderAndQR({ forceNew: true });
  } catch (e) {
    setNote("Xəta: yenilənmə alınmadı.");
    console.error(e);
  }
});

els.enablePush?.addEventListener("click", async () => {
  console.log("[customer_push] enablePush clicked", {
    currentOrder,
    VAPID_PUBLIC_KEY: !!VAPID_PUBLIC_KEY,
    CSRF_TOKEN: !!CSRF_TOKEN,
    SW_URL,
  });

  try {
    // QR olmadan push “hansı order üçün subscribe” bilmir
    if (!currentOrder) await initOrderAndQR({ forceNew: false });
    await subscribePush();
  } catch (e) {
    setNote("Push aktivləşmədi (permission/CSRF/VAPID/SW).");
    console.error(e);
  }
});
