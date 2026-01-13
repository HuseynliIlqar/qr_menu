import {CART_KEY} from "../../config/constants.js";
import {readJSON, writeJSON} from "../../utils/storage.js";

export function loadCart() {
    const parsed = readJSON(CART_KEY, null);

    // JSON.parse("null") => null, ona görə əl ilə yoxlayırıq
    if (!parsed || typeof parsed !== "object") return {items: {}};
    if (!parsed.items || typeof parsed.items !== "object") return {items: {}};

    return parsed;
}


export function saveCart(cart) {
    writeJSON(CART_KEY, cart);
}

export function clearCart() {
    saveCart({items: {}});
}

export function cartCount(cart) {
    return Object.values(cart.items).reduce((sum, it) => sum + (it.qty || 0), 0);
}

export function cartTotal(cart) {
    return Object.values(cart.items).reduce((sum, it) => sum + (it.qty || 0) * (it.price || 0), 0);
}

export function addToCartFromCard(card) {
    const id = card.dataset.id || `${card.dataset.name || ""}__${card.dataset.price || "0"}`;
    const name = card.dataset.name || "";
    const image = card.dataset.image || "";
    const price = parseFloat(card.dataset.price || "0") || 0;

    const cart = loadCart();
    const existing = cart.items[id];

    if (existing) existing.qty += 1;
    else cart.items[id] = {id, name, image, price, qty: 1};

    saveCart(cart);
    return cart;
}

export function setQty(id, qty) {
    const cart = loadCart();
    if (!cart.items[id]) return cart;

    if (qty <= 0) delete cart.items[id];
    else cart.items[id].qty = qty;

    saveCart(cart);
    return cart;
}
