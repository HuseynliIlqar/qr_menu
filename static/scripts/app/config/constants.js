export const CART_KEY = "qrmenu_cart_v1";
export const LAST_ORDER_KEY = "qrmenu_last_order_v1";

export const SELECTORS = {
    // slider
    slides: ".slide",
    prevBtn: ".slider-btn.prev",
    nextBtn: ".slider-btn.next",
    indicators: ".indicator",
    sliderContainer: ".hero-slider",

    // categories
    categoryChip: ".category-chip",
    foodCard: ".food-card",

    // food modal
    foodModal: "#food-modal",
    foodModalClose: "#modal-close",
    modalImg: "#modal-img",
    modalDiscount: "#modal-discount",
    modalTitle: "#modal-title",
    modalBadges: "#modal-badges",
    modalPrice: "#modal-price",
    modalDesc: "#modal-description",
    modalIngredients: "#modal-ingredients",
    modalAllergens: "#modal-allergens",
    modalAddToCart: "#modal-add-to-cart",

    // cart UI
    cartFab: "#cart-fab",
    cartModal: "#cart-modal",
    cartClose: "#cart-close",
    cartSubmit: "#cart-submit",
    cartCount: "#cart-count",
    cartItems: "#cart-items",
    cartEmpty: "#cart-empty",
    cartTotal: "#cart-total",
};

export const CART_ACTION_SELECTORS = {
    addToCartBtn: '[data-action="add-to-cart"]',
    qtyBtn: ".cart-qty-btn",
    removeBtn: "[data-remove]",
};

export const MONEY = {
    currencySymbol: "$",
    decimals: 2,
};
