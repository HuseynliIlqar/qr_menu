// --- Mock PRODUCTS (DB-dən gəlirmiş kimi) ---
// Sonra: PRODUCTS = await fetch("/api/products").then(r => r.json());
const PRODUCTS = [
    {id: 1, name: "Latte", price: 4.80},
    {id: 2, name: "Cappuccino", price: 4.20},
    {id: 3, name: "Americano", price: 3.50},
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
                {id: crypto.randomUUID(), name: "Cappuccino", qty: 1, price: 4.2},
                {id: crypto.randomUUID(), name: "Cheesecake", qty: 1, price: 6.0},
            ]
        },
        {
            id: crypto.randomUUID(),
            orderNo: "1002",
            status: "CALLED",
            createdAt: new Date(Date.now() - 4 * 60 * 1000),
            items: [
                {id: crypto.randomUUID(), name: "Americano", qty: 2, price: 3.5},
            ]
        }
    ],
    activeOrderId: null
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const statusPillClass = (s) => ({
    NEW: "new",
    WAITING: "wait",
    CALLED: "called",
    DELIVERED: "done"
}[s] || "new");

const fmtMoney = (n) => `${n.toFixed(2)} ₼`;
const sumTotal = (order) => order.items.reduce((acc, i) => acc + (i.qty * i.price), 0);

function renderKPIs() {
    const counts = {WAITING: 0, CALLED: 0, DELIVERED: 0, NEW: 0};
    store.orders.forEach(o => counts[o.status] = (counts[o.status] || 0) + 1);
    const el = $("#kpis");
    el.innerHTML = `
      <div class="box"><div class="muted">WAITING</div><div class="num">${counts.WAITING || 0}</div></div>
      <div class="box"><div class="muted">CALLED</div><div class="num">${counts.CALLED || 0}</div></div>
      <div class="box"><div class="muted">DELIVERED</div><div class="num">${counts.DELIVERED || 0}</div></div>
      <div class="box"><div class="muted">TOTAL</div><div class="num">${store.orders.length}</div></div>
    `;
}

function renderList() {
    const list = $("#orderList");
    if (store.orders.length === 0) {
        list.innerHTML = `<div class="muted">Hələ heç nə yoxdur.</div>`;
        return;
    }

    // sort: active statuses first, then newest
    const orderRank = {NEW: 0, WAITING: 1, CALLED: 2, DELIVERED: 3};
    const sorted = [...store.orders].sort((a, b) => {
        const ra = orderRank[a.status] ?? 9;
        const rb = orderRank[b.status] ?? 9;
        if (ra !== rb) return ra - rb;
        return b.createdAt - a.createdAt;
    });

    list.innerHTML = "";
    sorted.forEach(o => {
        const row = document.createElement("div");
        row.className = "row";
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
        row.addEventListener("click", () => openDetail(o.id));
        list.appendChild(row);
    });
}

function minsAgo(d) {
    const m = Math.floor((Date.now() - d.getTime()) / 60000);
    return Math.max(0, m);
}

// --- Modals ---
function openIntake() {
    $("#intakeBackdrop").style.display = "flex";
    $("#orderNoInput").value = "";
    $("#orderNoInput").focus();
}

function closeIntake() {
    $("#intakeBackdrop").style.display = "none";
}

function renderProductSelect() {
    const select = $("#productSelect");
    if (!select) return;
    select.innerHTML = "";
    PRODUCTS.forEach(p => {
        const opt = document.createElement("option");
        opt.value = String(p.id);
        opt.textContent = `${p.name} – ${fmtMoney(p.price)}`;
        select.appendChild(opt);
    });
}

function openDetail(orderId) {
    store.activeOrderId = orderId;
    const o = store.orders.find(x => x.id === orderId);
    if (!o) return;

    $("#detailBackdrop").style.display = "flex";
    $("#detailTitle").textContent = `Sifariş #${o.orderNo}`;
    $("#detailMeta").textContent = `Status: ${o.status} • ${o.items.length} item • ${minsAgo(o.createdAt)} dəq əvvəl`;

    renderProductSelect();
    renderDetailItems();
    syncButtons();
}

function closeDetail() {
    $("#detailBackdrop").style.display = "none";
    store.activeOrderId = null;
}

function renderDetailItems() {
    const o = store.orders.find(x => x.id === store.activeOrderId);
    const tbody = $("#itemsTable tbody");
    tbody.innerHTML = "";

    o.items.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${escapeHtml(item.name)}</td>
        <td>
          <div class="qty">
            <button class="btn mini" data-act="dec">-</button>
            <span>${item.qty}</span>
            <button class="btn mini" data-act="inc">+</button>
          </div>
        </td>
        <td class="right-align">${fmtMoney(item.price)}</td>
        <td class="right-align"><button class="btn mini" data-act="del">Sil</button></td>
      `;

        tr.querySelector('[data-act="dec"]').addEventListener("click", () => {
            item.qty = Math.max(1, item.qty - 1);
            renderDetailItems();
        });
        tr.querySelector('[data-act="inc"]').addEventListener("click", () => {
            item.qty += 1;
            renderDetailItems();
        });
        tr.querySelector('[data-act="del"]').addEventListener("click", () => {
            o.items = o.items.filter(x => x.id !== item.id);
            renderDetailItems();
        });

        tbody.appendChild(tr);
    });

    $("#detailTotal").textContent = fmtMoney(sumTotal(o));
    $("#detailMeta").textContent = `Status: ${o.status} • ${o.items.length} item • ${minsAgo(o.createdAt)} dəq əvvəl`;
}

function syncButtons() {
    const o = store.orders.find(x => x.id === store.activeOrderId);
    const accept = $("#btnAccept"), call = $("#btnCall"), deliver = $("#btnDeliver");

    accept.disabled = (o.status !== "NEW");
    call.disabled = (o.status !== "WAITING");
    deliver.disabled = (o.status !== "CALLED");
}

// --- Intake fetch cart (demo) ---
function fetchCartByOrderNo(orderNo) {
    // Realda: GET /api/carts/{orderNo}
    const cart = {
        orderNo,
        items: [
            {id: crypto.randomUUID(), name: "Latte", qty: 1, price: 4.8},
            {id: crypto.randomUUID(), name: "Brownie", qty: 1, price: 5.2}
        ]
    };
    return Promise.resolve(cart);
}

function createOrderFromCart(cart) {
    // Realda: POST /api/orders
    const order = {
        id: crypto.randomUUID(),
        orderNo: cart.orderNo,
        status: "NEW", // Qəbul et düyməsi ilə WAITING olacaq
        createdAt: new Date(),
        items: cart.items
    };
    store.orders.unshift(order);
    return order;
}

function setStatus(orderId, status) {
    // Realda: PATCH /api/orders/{id}
    const o = store.orders.find(x => x.id === orderId);
    if (!o) return;
    o.status = status;
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

// --- Events ---
$("#btnOpenIntake").addEventListener("click", openIntake);

$("#btnMockNew").addEventListener("click", () => {
    const cart = {
        orderNo: String(1000 + Math.floor(Math.random() * 9000)),
        items: [{id: crypto.randomUUID(), name: "Espresso", qty: 1, price: 2.9}]
    };
    const o = createOrderFromCart(cart);
    renderKPIs();
    renderList();
    openDetail(o.id);
});

$$("[data-close]").forEach(b => {
    b.addEventListener("click", (e) => {
        const which = e.currentTarget.getAttribute("data-close");
        if (which === "intake") closeIntake();
        if (which === "detail") closeDetail();
    });
});

$("#btnFetchCart").addEventListener("click", async () => {
    const orderNo = $("#orderNoInput").value.trim();
    if (!orderNo) {
        alert("Sifariş № boş ola bilməz.");
        return;
    }

    const cart = await fetchCartByOrderNo(orderNo);
    const order = createOrderFromCart(cart);

    closeIntake();
    renderKPIs();
    renderList();
    openDetail(order.id);
});

// ✅ DB-dən məhsul seçib əlavə et
$("#btnAddProduct").addEventListener("click", () => {
    const o = store.orders.find(x => x.id === store.activeOrderId);
    const select = $("#productSelect");
    const productId = parseInt(select.value, 10);

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Eyni məhsul varsa qty artır
    const existing = o.items.find(i => i.name === product.name);
    if (existing) {
        existing.qty += 1;
    } else {
        o.items.push({
            id: crypto.randomUUID(),
            name: product.name,
            qty: 1,
            price: product.price
        });
    }

    renderDetailItems();
});

$("#btnAccept").addEventListener("click", () => {
    const o = store.orders.find(x => x.id === store.activeOrderId);
    if (o.status !== "NEW") return;
    setStatus(o.id, "WAITING");
    renderKPIs();
    renderList();
    renderDetailItems();
    syncButtons();
});

$("#btnCall").addEventListener("click", () => {
    const o = store.orders.find(x => x.id === store.activeOrderId);
    if (o.status !== "WAITING") return;
    setStatus(o.id, "CALLED");
    renderKPIs();
    renderList();
    renderDetailItems();
    syncButtons();
});

$("#btnDeliver").addEventListener("click", () => {
    const o = store.orders.find(x => x.id === store.activeOrderId);
    if (o.status !== "CALLED") return;
    setStatus(o.id, "DELIVERED");
    renderKPIs();
    renderList();
    renderDetailItems();
    syncButtons();
});

// Close on backdrop click
$("#intakeBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "intakeBackdrop") closeIntake();
});
$("#detailBackdrop").addEventListener("click", (e) => {
    if (e.target.id === "detailBackdrop") closeDetail();
});

// Initial render
renderKPIs();
renderList();