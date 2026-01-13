import {LAST_ORDER_KEY} from "../../config/constants.js";
import {writeJSON} from "../../utils/storage.js";
import {cartCount, cartTotal, clearCart} from "./cartStore.js";

export async function submitCartDemo(cart) {
    if (cartCount(cart) === 0) return;

    const payload = {
        created_at: new Date().toISOString(),
        items: Object.values(cart.items),
        total: cartTotal(cart),
    };

    writeJSON(LAST_ORDER_KEY, payload);

    clearCart();
    alert("Sifariş göndərildi (demo). Kassir təsdiqi backend ilə gələcək.");
}

/**
 * Real backend üçün nümunə:
 * export async function submitCartToBackend(cart) {
 *   const resp = await fetch("/orders/create/", {
 *     method: "POST",
 *     headers: {"Content-Type":"application/json", "X-CSRFToken": "..."},
 *     body: JSON.stringify({items: Object.values(cart.items)})
 *   });
 *   if (!resp.ok) throw new Error("Order failed");
 *   return resp.json();
 * }
 */
