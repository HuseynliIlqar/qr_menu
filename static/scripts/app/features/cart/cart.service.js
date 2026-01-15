import {store} from "./store.js";
import {STATUSES} from "../../config/constants.js";

export function createOrder(cart) {
    const order = {
        id: crypto.randomUUID(),
        orderNo: cart.orderNo,
        status: STATUSES.NEW,
        createdAt: new Date(),
        items: cart.items,
    };
    store.orders.unshift(order);
    return order;
}

export function deleteOrder(orderId) {
    store.orders = store.orders.filter(o => o.id !== orderId);
}

export function addItem(order, product) {
    const existing = order.items.find(i => i.name === product.name);
    if (existing) existing.qty += 1;
    else {
        order.items.push({
            id: crypto.randomUUID(),
            name: product.name,
            qty: 1,
            price: product.price,
        });
    }
}

export function updateQty(order, itemId, delta) {
    const item = order.items.find(i => i.id === itemId);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
}

export function removeItem(order, itemId) {
    order.items = order.items.filter(i => i.id !== itemId);
}

export function setStatus(order, status) {
    order.status = status;
}
