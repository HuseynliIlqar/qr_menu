import {qsa} from "../../utils/dom.js";
import {SELECTORS} from "../../config/constants.js";

let selectedCategory = "all";

export function initCategoryFilter() {
    const chips = qsa(SELECTORS.categoryChip);
    if (chips.length === 0) return;

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            const slug = chip.dataset.category || "all";
            selectedCategory = slug;

            chips.forEach((c) => c.classList.toggle("active", c === chip));
            applyCategoryFilter(slug);
        });
    });
}

export function applyCategoryFilter(slug = selectedCategory) {
    const cards = qsa(SELECTORS.foodCard);
    if (cards.length === 0) return;

    cards.forEach((card) => {
        const cat = card.dataset.category || "uncategorized";
        const show = slug === "all" || cat === slug;
        card.style.display = show ? "" : "none";
    });
}
