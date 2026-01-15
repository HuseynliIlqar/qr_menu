import {store} from "./store.js";
import {STATUS_ORDER} from "../../config/constants.js";
import {fmtMoney} from "../../utils/format.js";
import {escapeHtml} from "../../utils/sanitize.js";

export function renderOrderList() {
    const el = document.querySelector("#orderList");
    if (!el) return;

    el.innerHTML = "";

    [...store.orders]
        .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
        .forEach(o => {
            const row = document.createElement("div");
            row.className = "row";
            row.dataset.orderId = o.id;
            row.innerHTML = `
        <div>
          <b>Order #${o.orderNo}</b>
          <div class="muted">${fmtMoney(total(o))}</div>
        </div>
        <span class="pill">${o.status}</span>
      `;
            el.appendChild(row);
        });
}

export function renderDetail(order) {
    const tbody = document.querySelector("#itemsTable tbody");
    tbody.innerHTML = "";

    order.items.forEach(i => {
        tbody.innerHTML += `
      <tr data-item-id="${i.id}">
        <td>${escapeHtml(i.name)}</td>
        <td>${i.qty}</td>
        <td>${fmtMoney(i.price)}</td>
        <td><button data-act="del">Sil</button></td>
      </tr>
    `;
    });

    document.querySelector("#detailTotal").textContent = fmtMoney(total(order));
}

function total(order) {
    return order.items.reduce((a, i) => a + i.qty * i.price, 0);
}
