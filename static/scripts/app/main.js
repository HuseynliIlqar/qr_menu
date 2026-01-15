import {initSlider} from "./features/slider/slider.js";
import {applyCategoryFilter, initCategoryFilter} from "./features/categories/categoryFilter.js";
import {initFoodModal} from "./features/modal/foodModal.js";
import {closeCart, initCartUI, renderCartUI, resetCartUI} from "./features/cart/cartUI.js";
import {submitCartDemo} from "./features/cart/cartSubmit.js";

document.addEventListener("DOMContentLoaded", async () => {
    // CUSTOMER SIDE
    const hasCustomerUI =
        document.querySelector(".swiper") ||
        document.querySelector("[data-category]") ||
        document.querySelector("#cartDrawer") ||
        document.querySelector("#cart") ||
        document.querySelector("#btnCart");

    if (hasCustomerUI) {
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
    }

    // BAR PANEL (dynamic import: file yoxdursa qr menu ölmür)
    const hasBarPanelUI =
        document.querySelector("#btnOpenIntake") ||
        document.querySelector("#orderList") ||
        document.querySelector("#detailBackdrop");

    if (hasBarPanelUI) {
        try {
            const mod = await import("./features/barPanel/barPanel.js");
            mod.initBarPanel();
        } catch (e) {
            console.error("Bar panel module load failed:", e);
        }
    }
});
