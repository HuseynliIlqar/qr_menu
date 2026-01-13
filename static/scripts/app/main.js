import {initSlider} from "./features/slider/slider.js";
import {applyCategoryFilter, initCategoryFilter} from "./features/categories/categoryFilter.js";
import {initFoodModal} from "./features/modal/foodModal.js";
import {closeCart, initCartUI, renderCartUI, resetCartUI} from "./features/cart/cartUI.js";
import {submitCartDemo} from "./features/cart/cartSubmit.js";

document.addEventListener("DOMContentLoaded", () => {
    initSlider();

    initCategoryFilter();
    applyCategoryFilter("all");

    initFoodModal();

    initCartUI({
        onSubmit: async (cart) => {
            await submitCartDemo(cart);
            resetCartUI();
            closeCart();
            renderCartUI();
        },
    });

    renderCartUI();
});
