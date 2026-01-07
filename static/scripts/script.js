// Badge icons SVG (modal üçün qalır)
const badgeIcons = {
  spicy:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
  vegan:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>',
  popular:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
  "chef-special":
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>',
};

// Current slider state
let currentSlide = 0;
let sliderInterval;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initSlider();
  initModal();
  initFoodCardClicks(); // ✅ JS filter silindikdən sonra modal üçün lazımdır
});

// Slider Functions (dəyişməyib)
function initSlider() {
  const slides = document.querySelectorAll(".slide");
  if (!slides || slides.length === 0) return;

  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  const indicators = document.querySelectorAll(".indicator");

  if (slides.length === 1) {
    slides[0].classList.add("active");
    if (indicators && indicators.length > 0) indicators[0].classList.add("active");
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    return;
  }

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove("active"));
    if (indicators && indicators.length > 0) indicators.forEach((ind) => ind.classList.remove("active"));

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    if (indicators && indicators.length > currentSlide) {
      indicators[currentSlide].classList.add("active");
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetSliderInterval();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetSliderInterval();
    });
  }

  if (indicators && indicators.length > 0) {
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        showSlide(index);
        resetSliderInterval();
      });
    });
  }

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const sliderContainer = document.querySelector(".hero-slider");

  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    if (touchStartX - touchEndX > 75) {
      nextSlide();
      resetSliderInterval();
    }
    if (touchStartX - touchEndX < -75) {
      prevSlide();
      resetSliderInterval();
    }
  }

  function startSliderInterval() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  function resetSliderInterval() {
    clearInterval(sliderInterval);
    startSliderInterval();
  }

  startSliderInterval();
}

// Modal Functions (əsasən eyni)
function initModal() {
  const modal = document.getElementById("food-modal");
  const closeBtn = document.getElementById("modal-close");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ✅ Yeni: server-render olunan kartlar üçün click handler
function initFoodCardClicks() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".food-card");
    if (!card) return;

    openModalFromCard(card);
  });
}

function openModalFromCard(card) {
  const item = {
    name: card.dataset.name || "",
    longDescription: card.dataset.longDescription || "",
    image: card.dataset.image || "",
    price: parseFloat(card.dataset.price || "0"),
    originalPrice: card.dataset.originalPrice ? parseFloat(card.dataset.originalPrice) : null,
    badges: (card.dataset.badges || "").split(",").map((s) => s.trim()).filter(Boolean),
    ingredients: (card.dataset.ingredients || "").split(",").map((s) => s.trim()).filter(Boolean),
    allergens: (card.dataset.allergens || "").split(",").map((s) => s.trim()).filter(Boolean),
  };

  openModal(item);
}

function openModal(item) {
  const modal = document.getElementById("food-modal");
  if (!modal) return;

  const hasDiscount = item.originalPrice && item.originalPrice > item.price;

  const modalImg = document.getElementById("modal-img");
  if (modalImg) {
    modalImg.src = item.image || "";
    modalImg.alt = item.name || "";
  }

  const title = document.getElementById("modal-title");
  if (title) title.textContent = item.name || "";

  const desc = document.getElementById("modal-description");
  if (desc) desc.textContent = item.longDescription || "";

  // Discount badge
  const discountBadge = document.getElementById("modal-discount");
  if (discountBadge) {
    if (hasDiscount) {
      discountBadge.textContent = `Save $${(item.originalPrice - item.price).toFixed(2)}`;
      discountBadge.style.display = "block";
    } else {
      discountBadge.style.display = "none";
    }
  }

  // Badges
  const badgesContainer = document.getElementById("modal-badges");
  if (badgesContainer) {
    badgesContainer.innerHTML = (item.badges || [])
      .map(
        (badge) => `
        <div class="badge badge-${badge}">
          ${badgeIcons[badge] || ""}
          <span>${getBadgeLabel(badge)}</span>
        </div>
      `
      )
      .join("");
  }

  // Price
  const priceContainer = document.getElementById("modal-price");
  if (priceContainer) {
    if (hasDiscount) {
      priceContainer.innerHTML = `
        <span class="price-original">$${item.originalPrice.toFixed(2)}</span>
        <span class="price-current">$${item.price.toFixed(2)}</span>
      `;
    } else {
      priceContainer.innerHTML = `
        <span class="price-regular">$${item.price.toFixed(2)}</span>
      `;
    }
  }

  // Ingredients
  const ingredientsContainer = document.getElementById("modal-ingredients");
  if (ingredientsContainer) {
    ingredientsContainer.innerHTML = (item.ingredients || []).map((ing) => `<li>${ing}</li>`).join("");
  }

  // Allergens
  const allergensContainer = document.getElementById("modal-allergens");
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
          <p>Contains: ${item.allergens.join(", ")}</p>
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
  const modal = document.getElementById("food-modal");
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function getBadgeLabel(badge) {
  const labels = {
    spicy: "Spicy",
    vegan: "Vegan",
    popular: "Popular",
    "chef-special": "Chef Special",
  };
  return labels[badge] || badge;
}
