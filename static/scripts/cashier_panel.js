// cashier_panel.js

const els = {
  scan: document.getElementById("scan-input"),
  floor: document.getElementById("floor-input"),
  name: document.getElementById("name-input"),
  accept: document.getElementById("accept-btn"),
  msg: document.getElementById("msg"),
  orders: document.getElementById("orders"),
};

const USE_JSON_RENDER = !!els.orders;

function setMsg(t) {
  if (els.msg) els.msg.textContent = t || "";
}

function getCookie(name) {
  const row = document.cookie.split("; ").find((r) => r.startsWith(name + "="));
  return row ? decodeURIComponent(row.split("=")[1]) : null;
}

const CSRF_TOKEN = window.__CSRF_TOKEN__ || getCookie("csrftoken") || "";

function orderRow(o) {
  const div = document.createElement("div");
  div.className = "info-card";
  div.style.padding = "12px";
  div.innerHTML = `
    <div class="info-content" style="width:100%;">
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;">
        <div>
          <div class="info-label">Kod: <strong>${o.order_code}</strong> | Status: ${o.status}</div>
          <div class="info-value">Mərtəbə: ${o.floor ?? "-"} | Ad: ${o.customer_name || "-"}</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;">
          <button data-action="call" data-id="${o.id}" class="add-to-cart-btn" type="button">Çağır</button>
          <button data-action="deliver" data-id="${o.id}" class="add-to-cart-btn" type="button">Təhvil</button>
          <button data-action="reject" data-id="${o.id}" class="add-to-cart-btn" type="button"
            style="border-color:var(--red);color:var(--red);">
            Ləğv
          </button>
        </div>
      </div>
    </div>
  `;
  return div;
}

async function loadOrders() {
  if (!USE_JSON_RENDER) return;

  const res = await fetch("/cashier/orders/", {
    method: "GET",
    credentials: "same-origin",
  });

  if (!res.ok) {
    setMsg("Orders yüklənmədi.");
    return;
  }

  const data = await res.json();
  if (!data.ok || !Array.isArray(data.orders)) {
    setMsg("Orders formatı səhvdir.");
    return;
  }

  els.orders.innerHTML = "";
  for (const o of data.orders) els.orders.appendChild(orderRow(o));
}

function afterMutation() {
  if (USE_JSON_RENDER) return loadOrders();
  window.location.reload();
}

function parsePayload(raw) {
  const text = (raw || "").trim();
  if (!text) throw new Error("Payload boşdur.");

  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error("Payload JSON deyil. QR içində JSON olmalıdır.");
  }

  if (!payload.order_code || !payload.customer_token) {
    throw new Error("Payload natamamdır. order_code və customer_token olmalıdır.");
  }
  return payload;
}

async function acceptOrder() {
  let payload;
  try {
    payload = parsePayload(els.scan?.value);
  } catch (e) {
    setMsg(e.message);
    return;
  }

  const floor = els.floor?.value ? Number(els.floor.value) : null;
  const customer_name = (els.name?.value || "").trim();

  const res = await fetch("/cashier/orders/accept/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    },
    body: JSON.stringify({
      order_code: payload.order_code,
      customer_token: payload.customer_token,
      floor,
      customer_name,
    }),
    credentials: "same-origin",
  });

  if (!res.ok) {
    setMsg("Qəbul alınmadı (order tapılmadı / permission / CSRF).");
    return;
  }

  const data = await res.json();
  if (!data.ok) {
    setMsg("Qəbul alınmadı.");
    return;
  }

  setMsg(`Qəbul edildi: ${data.order?.order_code || payload.order_code}`);
  if (els.scan) els.scan.value = "";

  await afterMutation();
}

async function doAction(orderId, action) {
  const res = await fetch(`/cashier/orders/${orderId}/action/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    },
    body: JSON.stringify({ action }),
    credentials: "same-origin",
  });

  if (!res.ok) {
    setMsg("Action failed (permission / CSRF / server).");
    return;
  }

  const data = await res.json();
  setMsg(`Action: ${action} | Push sent: ${data.sent ?? 0}`);

  await afterMutation();
}

// Bindings
els.accept?.addEventListener("click", acceptOrder);

if (USE_JSON_RENDER) {
  els.orders.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action][data-id]");
    if (!btn) return;
    doAction(btn.dataset.id, btn.dataset.action);
  });
} else {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action][data-id]");
    if (!btn) return;
    doAction(btn.dataset.id, btn.dataset.action);
  });
}

// init
loadOrders();

// --- Camera scan (Html5Qrcode) ---
const cam = {
  openBtn: document.getElementById("open-camera"),
  modal: document.getElementById("camera-modal"),
  closeBtn: document.getElementById("close-camera"),
  readerEl: document.getElementById("qr-reader"),
};

let qrScanner = null;

function openCamModal() {
  cam.modal?.classList.add("active");
  cam.modal?.setAttribute("aria-hidden", "false");
}

function closeCamModal() {
  cam.modal?.classList.remove("active");
  cam.modal?.setAttribute("aria-hidden", "true");
}

async function startScanner() {
  if (!cam.readerEl) return;

  qrScanner = new Html5Qrcode("qr-reader");
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  await qrScanner.start(
    { facingMode: "environment" },
    config,
    async (decodedText) => {
      if (els.scan) els.scan.value = decodedText;
      setMsg("QR oxundu. Qəbul edilir...");
      await stopScanner();
      closeCamModal();
      await acceptOrder();
    },
    () => {}
  );
}

async function stopScanner() {
  try {
    if (qrScanner) {
      await qrScanner.stop();
      await qrScanner.clear();
      qrScanner = null;
    }
  } catch {}
}

cam.openBtn?.addEventListener("click", async () => {
  openCamModal();
  try {
    await startScanner();
  } catch (e) {
    setMsg("Kamera açılmadı. HTTPS və permission yoxla.");
    console.error(e);
    closeCamModal();
  }
});

cam.closeBtn?.addEventListener("click", async () => {
  await stopScanner();
  closeCamModal();
});

cam.modal?.addEventListener("click", async (e) => {
  if (e.target === cam.modal) {
    await stopScanner();
    closeCamModal();
  }
});
