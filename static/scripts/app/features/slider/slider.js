import {on, qs, qsa} from "../../utils/dom.js";
import {SELECTORS} from "../../config/constants.js";

let currentSlide = 0;
let sliderInterval = null;

export function initSlider() {
    const slides = qsa(SELECTORS.slides);
    if (slides.length === 0) return;

    const prevBtn = qs(SELECTORS.prevBtn);
    const nextBtn = qs(SELECTORS.nextBtn);
    const indicators = qsa(SELECTORS.indicators);
    const sliderContainer = qs(SELECTORS.sliderContainer);

    if (slides.length === 1) {
        slides[0].classList.add("active");
        if (indicators[0]) indicators[0].classList.add("active");
        if (prevBtn) prevBtn.style.display = "none";
        if (nextBtn) nextBtn.style.display = "none";
        return;
    }

    function showSlide(n) {
        slides.forEach((s) => s.classList.remove("active"));
        indicators.forEach((i) => i.classList.remove("active"));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add("active");
        if (indicators[currentSlide]) indicators[currentSlide].classList.add("active");
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function start() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function reset() {
        clearInterval(sliderInterval);
        start();
    }

    on(prevBtn, "click", () => {
        prevSlide();
        reset();
    });

    on(nextBtn, "click", () => {
        nextSlide();
        reset();
    });

    indicators.forEach((ind, idx) => {
        on(ind, "click", () => {
            showSlide(idx);
            reset();
        });
    });

    // swipe
    let touchStartX = 0;
    let touchEndX = 0;

    on(sliderContainer, "touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    on(sliderContainer, "touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (diff > 75) {
            nextSlide();
            reset();
        } else if (diff < -75) {
            prevSlide();
            reset();
        }
    });

    start();
}
