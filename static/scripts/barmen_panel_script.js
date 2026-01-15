// --- Mock PRODUCTS (DB-dən gəlirmiş kimi) ---
// Sonra: PRODUCTS = await fetch("/api/products").then(r => r.json());
const PRODUCTS = [
  { id: 1, name: "Latte", price: 4.80 },
  { id: 2, name: "Cappuccino", price: 4.20 },
  { id: 3, name: "Americano", price: 3.50 },
];

// --- Demo in-memory store ---
const store = {
  orders: [
    {
      id: crypto.randomUUID(),
      orderNo: "1001",
      status: "WAITING",
      createdAt: new Date(Date.now() - 12 * 60 * 1000),
      items: [
        { id: crypto.randomUUID(), name: "Cappuccino", qty: 1, price: 4.2 },
        { id: crypto.randomUUID(), name: "Cheesecake", qty: 1, price: 6.0 },
      ],
    },
    {
      id: crypto.randomUUID(),
      orderNo: "1002",
      status: "CALLED",
      createdAt: new Date(Date.now() - 4 * 60 * 1000),
      items: [{ id: crypto.randomUUID(), name: "Americano", qty: 2, price: 3.5 }],
    },
  ],
  activeOrderId: null,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const statusPillClass = (s) =>
  ({
    NEW: "new",
    WAITING: "wait",
    CALLED: "called",
    DELIVERED: "done",
  }[s] || "new");

const fmtMoney = (n) => `${Number(n).toFixed(2)} ₼`;
const sumTotal = (order) =>
  order.items.reduce((acc, i) => acc + Number(i.qty) * Number(i.price), 0);

function minsAgo(d) {
  const m = Math.floor((Date.now() - d.getTime()) / 60000);
  return Math.max(0, m);
}

// --- Render KPIs ---
function renderKPIs() {
  const counts = { WAITING: 0, CALLED: 0, DELIVERED: 0, NEW: 0 };
  store.orders.forEach((o) => (counts[o.status] = (counts[o.status] || 0) + 1));

  const el = $("#kpis");
  if (!el) return;

  el.innerHTML = `
    <div class="box"><div class="muted">WAITING</div><div class="num">${counts.WAITING || 0}</div></div>
    <div class="box"><div class="muted">CALLED</div><div class="num">${counts.CALLED || 0}</div></div>
    <div class="box"><div class="muted">DELIVERED</div><div class="num">${counts.DELIVERED || 0}</div></div>
    <div class="box"><div class="muted">TOTAL</div><div class="num">${store.orders.length}</div></div>
  `;
}

// --- Render list ---
function renderList() {
  const list = $("#orderList");
  if (!list) return;

  if (store.orders.length === 0) {
    list.innerHTML = `<div class="muted">Hələ heç nə yoxdur.</div>`;
    return;
  }

  const orderRank = { NEW: 0, WAITING: 1, CALLED: 2, DELIVERED: 3 };
  const sorted = [...store.orders].sort((a, b) => {
    const ra = orderRank[a.status] ?? 9;
    const rb = orderRank[b.status] ?? 9;
    if (ra !== rb) return ra - rb;
    return b.createdAt - a.createdAt;
  });

  list.innerHTML = "";
  sorted.forEach((o) => {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.orderId = o.id;
    row.innerHTML = `
      <div class="left">
        <div style="font-weight:800">Order #${o.orderNo}</div>
        <div class="muted">${o.items.length} item • ${fmtMoney(sumTotal(o))}</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="pill ${statusPillClass(o.status)}">${o.status}</span>
        <span class="muted">${minsAgo(o.createdAt)}m</span>
      </div>
    `;
    list.appendChild(row);
  });
}

// --- Modals ---
function openIntake() {
  const bd = $("#intakeBackdrop");
  const inp = $("#orderNoInput");
  if (!bd || !inp) return;
  bd.style.display = "flex";
  inp.value = "";
  inp.focus();
}

function closeIntake() {
  const bd = $("#intakeBackdrop");
  if (bd) bd.style.display = "none";
}

function openDetail(orderId) {
  store.activeOrderId = orderId;
  const o = store.orders.find((x) => x.id === orderId);
  if (!o) return;

  const bd = $("#detailBackdrop");
  if (!bd) return;

  bd.style.display = "flex";
  $("#detailTitle").textContent = `Sifariş #${o.orderNo}`;
  $("#detailMeta").textContent = `Status: ${o.status} • ${o.items.length} item • ${minsAgo(o.createdAt)} dəq əvvəl`;

  renderProductSelect();
  renderDetailItems();
  syncButtons();
}

function closeDetail() {
  const bd = $("#detailBackdrop");
  if (bd) bd.style.display = "none";
  store.activeOrderId = null;
}

function renderProductSelect() {
  const select = $("#productSelect");
  if (!select) return;
  select.innerHTML = "";
  PRODUCTS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = String(p.id);
    opt.textContent = `${p.name} – ${fmtMoney(p.price)}`;
    select.appendChild(opt);
  });
}

function renderDetailItems() {
  const o = store.orders.find((x) => x.id === store.activeOrderId);
  if (!o) return;

  const tbody = $("#itemsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (o.items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="muted">Səbət boşdur.</td></tr>`;
  } else {
    o.items.forEach((item) => {
      const tr = document.createElement("tr");
      tr.dataset.itemId = item.id;
      tr.innerHTML = `
        <td>${escapeHtml(item.name)}</td>
        <td>
          <div class="qty">
            <button class="btn mini" data-act="dec" type="button">-</button>
            <span>${item.qty}</span>
            <button class="btn mini" data-act="inc" type="button">+</button>
          </div>
        </td>
        <td class="right-align">${fmtMoney(item.price)}</td>
        <td class="right-align">
          <button class="btn mini" data-act="del" type="button">Sil</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  $("#detailTotal").textContent = fmtMoney(sumTotal(o));
  $("#detailMeta").textContent = `Status: ${o.status} • ${o.items.length} item • ${minsAgo(o.createdAt)} dəq əvvəl`;
}

function syncButtons() {
  const o = store.orders.find((x) => x.id === store.activeOrderId);
  if (!o) return;

  const accept = $("#btnAccept");
  const call = $("#btnCall");
  const deliver = $("#btnDeliver");

  if (accept) accept.disabled = o.status !== "NEW";
  if (call) call.disabled = o.status !== "WAITING";
  if (deliver) deliver.disabled = o.status !== "CALLED";
}

// --- Intake fetch cart (demo) ---
function fetchCartByOrderNo(orderNo) {
  // Realda: GET /api/carts/{orderNo}
  const cart = {
    orderNo,
    items: [
      { id: crypto.randomUUID(), name: "Latte", qty: 1, price: 4.8 },
      { id: crypto.randomUUID(), name: "Brownie", qty: 1, price: 5.2 },
    ],
  };
  return Promise.resolve(cart);
}

function createOrderFromCart(cart) {
  // Realda: POST /api/orders
  const order = {
    id: crypto.randomUUID(),
    orderNo: cart.orderNo,
    status: "NEW",
    createdAt: new Date(),
    items: cart.items,
  };
  store.orders.unshift(order);
  return order;
}

function setStatus(orderId, status) {
  // Realda: PATCH /api/orders/{id}
  const o = store.orders.find((x) => x.id === orderId);
  if (!o) return;
  o.status = status;
}

// ✅ SƏBƏTİ (ORDER) TAM SİL
function deleteOrder(orderId) {
  store.orders = store.orders.filter((o) => o.id !== orderId);
}

// --- Safety-ish ---
function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ================= EVENTS =================
function bindEvents() {
  // Open intake
  const btnOpen = $("#btnOpenIntake");
  if (btnOpen) btnOpen.addEventListener("click", openIntake);

  // Close buttons
  $$("[data-close]").forEach((b) => {
    b.addEventListener("click", (e) => {
      const which = e.currentTarget.getAttribute("data-close");
      if (which === "intake") closeIntake();
      if (which === "detail") closeDetail();
    });
  });

  // Close on backdrop click
  const intakeBd = $("#intakeBackdrop");
  if (intakeBd) {
    intakeBd.addEventListener("click", (e) => {
      if (e.target && e.target.id === "intakeBackdrop") closeIntake();
    });
  }
  const detailBd = $("#detailBackdrop");
  if (detailBd) {
    detailBd.addEventListener("click", (e) => {
      if (e.target && e.target.id === "detailBackdrop") closeDetail();
    });
  }

  // List click (delegation)
  const list = $("#orderList");
  if (list) {
    list.addEventListener("click", (e) => {
      const row = e.target.closest(".row");
      if (!row) return;
      const id = row.dataset.orderId;
      if (id) openDetail(id);
    });
  }

  // Fetch cart -> create NEW order
  const btnFetch = $("#btnFetchCart");
  if (btnFetch) {
    btnFetch.addEventListener("click", async () => {
      const orderNo = ($("#orderNoInput")?.value || "").trim();
      if (!orderNo) return alert("Sifariş № boş ola bilməz.");

      const cart = await fetchCartByOrderNo(orderNo);
      const order = createOrderFromCart(cart);

      closeIntake();
      renderKPIs();
      renderList();
      openDetail(order.id);
    });
  }

  // Add product to active order
  const btnAdd = $("#btnAddProduct");
  if (btnAdd) {
    btnAdd.addEventListener("click", () => {
      const o = store.orders.find((x) => x.id === store.activeOrderId);
      if (!o) return;

      const select = $("#productSelect");
      if (!select) return;

      const productId = parseInt(select.value, 10);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;

      const existing = o.items.find((i) => i.name === product.name);
      if (existing) existing.qty += 1;
      else {
        o.items.push({
          id: crypto.randomUUID(),
          name: product.name,
          qty: 1,
          price: product.price,
        });
      }

      renderDetailItems();
      renderKPIs();
      renderList();
    });
  }

  // Qty +/- and item delete (delegation)
  const tbody = $("#itemsTable tbody");
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-act]");
      if (!btn) return;

      const o = store.orders.find((x) => x.id === store.activeOrderId);
      if (!o) return;

      const tr = btn.closest("tr");
      const itemId = tr?.dataset.itemId;
      if (!itemId) return;

      const act = btn.dataset.act;
      const item = o.items.find((i) => i.id === itemId);
      if (!item) return;

      if (act === "inc") item.qty += 1;
      if (act === "dec") item.qty = Math.max(1, item.qty - 1);
      if (act === "del") o.items = o.items.filter((i) => i.id !== itemId);

      renderDetailItems();
      renderKPIs();
      renderList();
    });
  }

  // Status buttons
  const btnAccept = $("#btnAccept");
  if (btnAccept) {
    btnAccept.addEventListener("click", () => {
      const o = store.orders.find((x) => x.id === store.activeOrderId);
      if (!o || o.status !== "NEW") return;
      setStatus(o.id, "WAITING");
      renderKPIs();
      renderList();
      renderDetailItems();
      syncButtons();
    });
  }

  const btnCall = $("#btnCall");
  if (btnCall) {
    btnCall.addEventListener("click", () => {
      const o = store.orders.find((x) => x.id === store.activeOrderId);
      if (!o || o.status !== "WAITING") return;
      setStatus(o.id, "CALLED");
      renderKPIs();
      renderList();
      renderDetailItems();
      syncButtons();
    });
  }

  const btnDeliver = $("#btnDeliver");
  if (btnDeliver) {
    btnDeliver.addEventListener("click", () => {
      const o = store.orders.find((x) => x.id === store.activeOrderId);
      if (!o || o.status !== "CALLED") return;
      setStatus(o.id, "DELIVERED");
      renderKPIs();
      renderList();
      renderDetailItems();
      syncButtons();
    });
  }

  // ✅ Delete whole order (cart)
  const btnDelete = $("#btnDeleteOrder");
  if (btnDelete) {
    btnDelete.addEventListener("click", () => {
      const o = store.orders.find((x) => x.id === store.activeOrderId);
      if (!o) return;

      const ok = confirm(`Sifariş #${o.orderNo} silinsin?`);
      if (!ok) return;

      deleteOrder(o.id);
      closeDetail();
      renderKPIs();
      renderList();
    });
  }
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  renderKPIs();
  renderList();
});
