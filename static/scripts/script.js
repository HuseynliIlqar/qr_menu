document.getElementById('year').textContent = new Date().getFullYear();

const search = document.getElementById('search');
const clearBtn = document.getElementById('clear');
const menuCards = [...document.querySelectorAll('#menuGrid .card')];
const catCards = [...document.querySelectorAll('#catList .cat')];

function doFilter(q) {
    const term = q.trim().toLowerCase();
    const show = el => el.style.display = '';
    const hide = el => el.style.display = 'none';

    if (!term) {
        menuCards.forEach(show);
        catCards.forEach(show);
        return;
    }

    menuCards.forEach(card => {
        const tags = (card.dataset.tags || '').toLowerCase();
        const title = card.querySelector('strong')?.textContent.toLowerCase() || '';
        (tags.includes(term) || title.includes(term)) ? show(card) : hide(card);
    });
    catCards.forEach(cat => {
        const tags = (cat.dataset.tags || '').toLowerCase();
        const title = cat.querySelector('h3')?.textContent.toLowerCase() || '';
        (tags.includes(term) || title.includes(term)) ? show(cat) : hide(cat);
    });
}

search.addEventListener('input', e => doFilter(e.target.value));
clearBtn.addEventListener('click', () => {
    search.value = '';
    doFilter('');
    search.focus();
});

document.querySelectorAll('#catList .cat').forEach(cat => {
    cat.addEventListener('click', e => {
        const title = cat.querySelector('h3')?.textContent || '';
        search.value = title;
        doFilter(title);
    });
});

(function(){
    const root = document.getElementById('heroSlider');
    if(!root) return;

    const slides = Array.from(root.querySelectorAll('.hero-slide'));
    const dots = Array.from(root.querySelectorAll('.hero-dot'));
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    if(slides.length <= 1) return;

    let idx = 0;
    const setActive = (i) => {
        idx = (i + slides.length) % slides.length;
        slides.forEach((s, k) => s.classList.toggle('is-active', k === idx));
        dots.forEach((d, k) => d.classList.toggle('is-active', k === idx));
    };

    // dot click
    dots.forEach(d => {
        d.addEventListener('click', () => setActive(parseInt(d.dataset.to, 10)));
    });

    // arrows
    if(prevBtn) prevBtn.addEventListener('click', () => setActive(idx - 1));
    if(nextBtn) nextBtn.addEventListener('click', () => setActive(idx + 1));

    // autoplay
    let timer = setInterval(() => setActive(idx + 1), 4500);

    // pause on hover
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', () => {
        timer = setInterval(() => setActive(idx + 1), 4500);
    });
})();