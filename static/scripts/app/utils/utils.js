export function qs(sel, root = document) {
    return root.querySelector(sel);
}

export function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
}

export function on(el, event, handler, opts) {
    if (!el) return;
    el.addEventListener(event, handler, opts);
}

export function closest(el, sel) {
    if (!el) return null;
    return el.closest(sel);
}
