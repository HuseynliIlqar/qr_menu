// Food Data
const foodData = [
    {
        id: '1',
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce',
        longDescription: 'Our signature Classic Burger features a premium beef patty grilled to perfection, topped with crisp lettuce, ripe tomatoes, pickles, onions, and our secret house sauce. Served on a toasted brioche bun for the ultimate burger experience.',
        price: 12.99,
        originalPrice: 15.99,
        image: 'https://images.unsplash.com/photo-1761315412811-4525e421e00b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZnJpZXN8ZW58MXx8fHwxNzY3MjAzMzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'burgers',
        badges: ['popular', 'chef-special'],
        ingredients: ['Beef patty', 'Brioche bun', 'Lettuce', 'Tomato', 'Pickles', 'Onions', 'Special sauce'],
        allergens: ['Gluten', 'Eggs', 'Dairy']
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        description: 'Traditional Italian pizza with fresh mozzarella and basil',
        longDescription: 'Authentic Margherita Pizza made with hand-stretched dough, San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic basil leaves. Cooked in our wood-fired oven for that perfect crispy crust.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emF8ZW58MXx8fHwxNzY3MTU1NzY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'pizza',
        badges: ['chef-special'],
        ingredients: ['Pizza dough', 'San Marzano tomatoes', 'Fresh mozzarella', 'Basil', 'Olive oil', 'Sea salt'],
        allergens: ['Gluten', 'Dairy']
    },
    {
        id: '3',
        name: 'Fresh Garden Salad',
        description: 'Mixed greens with seasonal vegetables and house vinaigrette',
        longDescription: 'A vibrant mix of fresh seasonal greens, cherry tomatoes, cucumbers, carrots, and bell peppers. Topped with our homemade balsamic vinaigrette and garnished with seeds for extra crunch.',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NjcyMDMwMjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'salads',
        badges: ['vegan', 'popular'],
        ingredients: ['Mixed greens', 'Cherry tomatoes', 'Cucumbers', 'Carrots', 'Bell peppers', 'Seeds', 'Balsamic vinaigrette'],
        allergens: []
    },
    {
        id: '4',
        name: 'Creamy Carbonara',
        description: 'Classic Italian pasta with pancetta and parmesan',
        longDescription: 'Traditional Carbonara pasta made with al dente spaghetti, crispy pancetta, farm-fresh eggs, aged Parmigiano-Reggiano, and black pepper. A true Roman classic that melts in your mouth.',
        price: 16.99,
        originalPrice: 19.99,
        image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGNhcmJvbmFyYXxlbnwxfHx8fDE3NjcxODkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'pasta',
        badges: ['chef-special'],
        ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmigiano-Reggiano', 'Black pepper', 'Pasta water'],
        allergens: ['Gluten', 'Eggs', 'Dairy', 'Pork']
    },
    {
        id: '5',
        name: 'Spicy Buffalo Wings',
        description: 'Crispy chicken wings tossed in hot buffalo sauce',
        longDescription: 'Perfectly crispy chicken wings double-fried and tossed in our signature spicy buffalo sauce. Served with cooling ranch dressing and celery sticks. Warning: these are seriously hot!',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1590058301829-d16716ed706c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBzcGljeXxlbnwxfHx8fDE3NjcyMDMzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'wings',
        badges: ['spicy', 'popular'],
        ingredients: ['Chicken wings', 'Buffalo sauce', 'Hot peppers', 'Butter', 'Garlic', 'Ranch dressing', 'Celery'],
        allergens: ['Dairy']
    },
    {
        id: '6',
        name: 'Street Tacos',
        description: 'Three soft tacos with your choice of filling',
        longDescription: 'Authentic street-style tacos served on soft corn tortillas with your choice of seasoned beef, grilled chicken, or black beans. Topped with fresh cilantro, onions, lime, and our house salsa.',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1707604341704-74abdc25e52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW4lMjBmb29kfGVufDF8fHx8MTc2NzEwNDg1OHww&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'burgers',
        badges: ['spicy'],
        ingredients: ['Corn tortillas', 'Seasoned beef/chicken/beans', 'Cilantro', 'Onions', 'Lime', 'Salsa'],
        allergens: ['May contain gluten']
    },
    {
        id: '7',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center',
        longDescription: 'Decadent chocolate lava cake with a gooey molten center. Served warm with a scoop of vanilla ice cream and fresh berries. The perfect ending to your meal.',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjcxODQ1MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'desserts',
        badges: ['popular', 'chef-special'],
        ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla ice cream', 'Berries'],
        allergens: ['Gluten', 'Eggs', 'Dairy']
    },
    {
        id: '8',
        name: 'Craft Beer Selection',
        description: 'Rotating selection of local craft beers',
        longDescription: 'Choose from our carefully curated selection of local craft beers. We feature rotating taps from the best breweries in the region, including IPAs, stouts, lagers, and seasonal specials.',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1643307282439-08cb542c6edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjBnbGFzc3xlbnwxfHx8fDE3NjcxMDQzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'drinks',
        badges: ['popular'],
        ingredients: ['Craft beer (various styles)', 'Ask server for current selection'],
        allergens: ['Gluten', 'Contains alcohol']
    },
    {
        id: '9',
        name: 'Truffle Fries',
        description: 'Crispy fries with truffle oil and parmesan',
        longDescription: 'Golden, crispy hand-cut fries drizzled with premium truffle oil and topped with freshly grated Parmigiano-Reggiano and parsley. A luxurious twist on a classic side.',
        price: 7.99,
        originalPrice: 9.99,
        image: 'https://images.unsplash.com/photo-1717294978892-cef673e1d17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGdvbGRlbnxlbnwxfHx8fDE3NjcyMDMzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        category: 'wings',
        badges: ['chef-special'],
        ingredients: ['Potatoes', 'Truffle oil', 'Parmigiano-Reggiano', 'Parsley', 'Sea salt'],
        allergens: ['Dairy']
    }
];

// Badge icons SVG
const badgeIcons = {
    spicy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
    vegan: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>',
    popular: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    'chef-special': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path><line x1="6" y1="17" x2="18" y2="17"></line></svg>'
};

// Current state
let currentSlide = 0;
let currentCategory = 'all';
let sliderInterval;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initCategories();
    renderFoodItems(foodData);
    initModal();
});

// Slider Functions
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    if (!slides || slides.length === 0) {
        // No slides present — nothing to initialize
        return;
    }

    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const indicators = document.querySelectorAll('.indicator');

    // If only one slide, show it and disable controls/auto-play
    if (slides.length === 1) {
        slides[0].classList.add('active');
        if (indicators && indicators.length > 0) indicators[0].classList.add('active');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (indicators && indicators.length > 0) indicators.forEach(ind => ind.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (indicators && indicators.length > currentSlide) {
            indicators[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSliderInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSliderInterval();
        });
    }

    if (indicators && indicators.length > 0) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                resetSliderInterval();
            });
        });
    }

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const sliderContainer = document.querySelector('.hero-slider');

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
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

    // Auto-play
    function startSliderInterval() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function resetSliderInterval() {
        clearInterval(sliderInterval);
        startSliderInterval();
    }

    startSliderInterval();
}

// Categories Functions
function initCategories() {
    const categoryChips = document.querySelectorAll('.category-chip');

    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const category = chip.dataset.category;
            
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            currentCategory = category;
            filterFoodItems();
        });
    });
}

function filterFoodItems() {
    const filteredData = currentCategory === 'all' 
        ? foodData 
        : foodData.filter(item => item.category === currentCategory);
    
    renderFoodItems(filteredData);
}

// Food Items Functions
function renderFoodItems(items) {
    const foodGrid = document.getElementById('food-grid');
    foodGrid.innerHTML = '';

    items.forEach(item => {
        const foodCard = createFoodCard(item);
        foodGrid.appendChild(foodCard);
    });
}

function createFoodCard(item) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.onclick = () => openModal(item);

    const hasDiscount = item.originalPrice && item.originalPrice > item.price;

    card.innerHTML = `
        <div class="food-image">
            <img src="${item.image}" alt="${item.name}">
            ${hasDiscount ? `<div class="discount-badge">Save $${(item.originalPrice - item.price).toFixed(2)}</div>` : ''}
        </div>
        <div class="food-content">
            <h3 class="food-name">${item.name}</h3>
            <p class="food-description">${item.description}</p>
            ${item.badges.length > 0 ? `
                <div class="food-badges">
                    ${item.badges.map(badge => `
                        <div class="badge badge-${badge}">
                            ${badgeIcons[badge]}
                            <span>${getBadgeLabel(badge)}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            <div class="food-price">
                ${hasDiscount ? `
                    <span class="price-original">$${item.originalPrice.toFixed(2)}</span>
                    <span class="price-current">$${item.price.toFixed(2)}</span>
                ` : `
                    <span class="price-regular">$${item.price.toFixed(2)}</span>
                `}
            </div>
        </div>
    `;

    return card;
}

function getBadgeLabel(badge) {
    const labels = {
        'spicy': 'Spicy',
        'vegan': 'Vegan',
        'popular': 'Popular',
        'chef-special': 'Chef Special'
    };
    return labels[badge] || badge;
}

// Modal Functions
function initModal() {
    const modal = document.getElementById('food-modal');
    const closeBtn = document.getElementById('modal-close');

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(item) {
    const modal = document.getElementById('food-modal');
    const hasDiscount = item.originalPrice && item.originalPrice > item.price;

    document.getElementById('modal-img').src = item.image;
    document.getElementById('modal-img').alt = item.name;
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-description').textContent = item.longDescription;

    // Discount badge
    const discountBadge = document.getElementById('modal-discount');
    if (hasDiscount) {
        discountBadge.textContent = `Save $${(item.originalPrice - item.price).toFixed(2)}`;
        discountBadge.style.display = 'block';
    } else {
        discountBadge.style.display = 'none';
    }

    // Badges
    const badgesContainer = document.getElementById('modal-badges');
    badgesContainer.innerHTML = item.badges.map(badge => `
        <div class="badge badge-${badge}">
            ${badgeIcons[badge]}
            <span>${getBadgeLabel(badge)}</span>
        </div>
    `).join('');

    // Price
    const priceContainer = document.getElementById('modal-price');
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

    // Ingredients
    const ingredientsContainer = document.getElementById('modal-ingredients');
    ingredientsContainer.innerHTML = item.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');

    // Allergens
    const allergensContainer = document.getElementById('modal-allergens');
    if (item.allergens && item.allergens.length > 0) {
        allergensContainer.classList.add('active');
        allergensContainer.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <div class="modal-allergens-content">
                <h3>Allergen Information</h3>
                <p>Contains: ${item.allergens.join(', ')}</p>
            </div>
        `;
    } else {
        allergensContainer.classList.remove('active');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('food-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}
