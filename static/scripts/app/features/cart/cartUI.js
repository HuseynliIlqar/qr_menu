import {qs} from "../../utils/dom.js";
import {SELECTORS} from "../../config/constants.js";
import {escapeHTML} from "../../utils/sanitize.js";
import {money} from "../../utils/format.js";
import {cartCount, cartTotal, clearCart, loadCart, setQty} from "./cartStore.js";

export function initCartUI({onSubmit} = {}) {
    const fab = qs(SELECTORS.cartFab);
    const modal = qs(SELECTORS.cartModal);
    const close = qs(SELECTORS.cartClose);
    const submit = qs(SELECTORS.cartSubmit);

    if (fab) fab.addEventListener("click", openCart);
    if (close) close.addEventListener("click", closeCart);

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeCart();
        });
    }

    if (submit) {
        submit.addEventListener("click", async () => {
            const cart = loadCart();
            if (cartCount(cart) === 0) {
                alert("Səbət boşdur.");
                return;
            }

            if (typeof onSubmit === "function") {
                await onSubmit(cart);
            } else {
                // default demo submit
                alert("Submit handler yoxdur.");
            }
        });
    }

    renderCartUI();
}

export function openCart() {
    const modal = qs(SELECTORS.cartModal);
    if (!modal) return;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

export function closeCart() {
    const modal = qs(SELECTORS.cartModal);
    if (!modal) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

export function renderCartUI() {
    const cart = loadCart();

    const countEl = qs(SELECTORS.cartCount);
    const itemsEl = qs(SELECTORS.cartItems);
    const emptyEl = qs(SELECTORS.cartEmpty);
    const totalEl = qs(SELECTORS.cartTotal);

    const items = Object.values(cart.items);

    if (countEl) countEl.textContent = String(cartCount(cart));
    if (emptyEl) emptyEl.style.display = items.length ? "none" : "block";
    if (totalEl) totalEl.textContent = money(cartTotal(cart));

    if (!itemsEl) return;

    itemsEl.innerHTML = items
        .map(
            (it) => `
      <div class="cart-item">
        <div class="cart-item-left">
          <div class="cart-item-thumb">
            ${
                it.image
                    ? `<img src="${it.image}" alt="${escapeHTML(it.name)}">`
                    : `<div class="cart-thumb-ph"></div>`
            }
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${escapeHTML(it.name)}</div>
            <div class="cart-item-price">${money(it.price || 0)}</div>
          </div>
        </div>

        <div class="cart-item-right">
          <div class="cart-qty">
            <button class="cart-qty-btn" type="button" data-qty="-1" data-id="${it.id}" aria-label="Azalt">-</button>
            <span class="cart-qty-val">${it.qty}</span>
            <button class="cart-qty-btn" type="button" data-qty="+1" data-id="${it.id}" aria-label="Artır">+</button>
          </div>

          <button class="cart-remove" type="button" data-remove="1" data-id="${it.id}" aria-label="Sil">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `
        )
        .join("");

    // delegation
    itemsEl.onclick = (e) => {
        const qtyBtn = e.target.closest(".cart-qty-btn");
        if (qtyBtn) {
            const id = qtyBtn.dataset.id;
            const delta = qtyBtn.dataset.qty === "+1" ? 1 : -1;
            const fresh = loadCart();
            const current = fresh.items[id]?.qty || 0;
            setQty(id, current + delta);
            renderCartUI();
            return;
        }

        const rm = e.target.closest("[data-remove]");
        if (rm) {
            const id = rm.dataset.id;
            setQty(id, 0);
            renderCartUI();
        }
    };
}

export function resetCartUI() {
    clearCart();
    renderCartUI();
}
