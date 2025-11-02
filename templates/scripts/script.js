// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple search filter for both menu and categories
const search = document.getElementById('search');
const clearBtn = document.getElementById('clear');
const menuCards = [...document.querySelectorAll('#menuGrid .card')];
const catCards = [...document.querySelectorAll('#catList .cat')];

function doFilter(q) {
    const term = q.trim().toLowerCase();
    const show = el => el.style.display = '';
    const hide = el => el.style.display = 'none';

    if (!term) { menuCards.forEach(show); catCards.forEach(show); return; }

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
clearBtn.addEventListener('click', () => { search.value = ''; doFilter(''); search.focus(); });

// Category click scroll to menu and pre-filter (optional: wires term by heading)
document.querySelectorAll('#catList .cat').forEach(cat => {
    cat.addEventListener('click', e => {
        const title = cat.querySelector('h3')?.textContent || '';
        // preload search term, then filter
        search.value = title;
        doFilter(title);
    });
});