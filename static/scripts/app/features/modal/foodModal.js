import {on, qs} from "../../utils/dom.js";
import {CART_ACTION_SELECTORS, SELECTORS} from "../../config/constants.js";
import {badgeIcons} from "../../data/badgeIcons.js";
import {getBadgeLabel} from "../../data/badgeLabels.js";
import {escapeHTML} from "../../utils/sanitize.js";
import {money} from "../../utils/format.js";
import {addToCartFromCard} from "../cart/cartStore.js";
import {openCart, renderCartUI} from "../cart/cartUI.js";

let lastOpenedCard = null;

export function initFoodModal() {
    const modal = qs(SELECTORS.foodModal);
    const closeBtn = qs(SELECTORS.foodModalClose);
    const addBtn = qs(SELECTORS.modalAddToCart);

    on(closeBtn, "click", closeModal);

    on(modal, "click", (e) => {
        if (e.target === modal) closeModal();
    });

    on(document, "keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // modal add-to-cart
    on(addBtn, "click", () => {
        if (!lastOpenedCard) return;
        addToCartFromCard(lastOpenedCard);
        renderCartUI();
        closeModal();
        openCart(); // istəmirsənsə sil
    });

    // Card click + card add button click
    on(document, "click", (e) => {
        const addBtnInside = e.target.closest(CART_ACTION_SELECTORS.addToCartBtn);
        if (addBtnInside) {
            e.preventDefault();
            e.stopPropagation();
            const card = addBtnInside.closest(".food-card");
            if (!card) return;
            addToCartFromCard(card);
            renderCartUI();
            openCart(); // istəmirsənsə sil
            return;
        }

        const card = e.target.closest(".food-card");
        if (!card) return;
        if (card.style.display === "none") return;

        openModalFromCard(card);
    });
}

function openModalFromCard(card) {
    lastOpenedCard = card;

    const priceRaw = card.dataset.price || "0";
    const originalRaw = card.dataset.originalPrice || "0";

    const item = {
        name: card.dataset.name || "",
        longDescription: card.dataset.longDescription || "",
        image: card.dataset.image || "",
        price: parseFloat(priceRaw) || 0,
        originalPrice: parseFloat(originalRaw) || 0,
        badges: (card.dataset.badges || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        ingredients: (card.dataset.ingredients || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        allergens: (card.dataset.allergens || "")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
    };

    openModal(item);
}

function openModal(item) {
    const modal = qs(SELECTORS.foodModal);
    if (!modal) return;

    const hasDiscount = item.originalPrice > 0 && item.price > 0 && item.originalPrice > item.price;

    const modalImg = qs(SELECTORS.modalImg);
    if (modalImg) {
        modalImg.src = item.image || "";
        modalImg.alt = item.name || "";
    }

    const title = qs(SELECTORS.modalTitle);
    if (title) title.textContent = item.name || "";

    const desc = qs(SELECTORS.modalDesc);
    if (desc) desc.textContent = item.longDescription || "";

    const discountBadge = qs(SELECTORS.modalDiscount);
    if (discountBadge) {
        if (hasDiscount) {
            discountBadge.textContent = `Save ${(item.originalPrice - item.price).toFixed(2)}`;
            discountBadge.style.display = "block";
        } else {
            discountBadge.style.display = "none";
        }
    }

    const badgesContainer = qs(SELECTORS.modalBadges);
    if (badgesContainer) {
        badgesContainer.innerHTML = (item.badges || [])
            .map(
                (badge) => `
        <div class="badge badge-${badge}">
          ${badgeIcons[badge] || ""}
          <span>${escapeHTML(getBadgeLabel(badge))}</span>
        </div>`
            )
            .join("");
    }

    const priceContainer = qs(SELECTORS.modalPrice);
    if (priceContainer) {
        priceContainer.innerHTML = hasDiscount
            ? `
        <span class="price-original">${money(item.originalPrice)}</span>
        <span class="price-current">${money(item.price)}</span>
      `
            : `<span class="price-regular">${money(item.price)}</span>`;
    }

    const ingredientsContainer = qs(SELECTORS.modalIngredients);
    if (ingredientsContainer) {
        ingredientsContainer.innerHTML = (item.ingredients || [])
            .map((ing) => `<li>${escapeHTML(ing)}</li>`)
            .join("");
    }

    const allergensContainer = qs(SELECTORS.modalAllergens);
    if (allergensContainer) {
        if (item.allergens && item.allergens.length > 0) {
            allergensContainer.classList.add("active");
            allergensContainer.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <div class="modal-allergens-content">
          <h3>Allergen Information</h3>
          <p>Contains: ${item.allergens.map(escapeHTML).join(", ")}</p>
        </div>
      `;
        } else {
            allergensContainer.classList.remove("active");
            allergensContainer.innerHTML = "";
        }
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = qs(SELECTORS.foodModal);
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
}
