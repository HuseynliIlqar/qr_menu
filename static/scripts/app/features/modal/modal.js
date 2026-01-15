export function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "flex";
}

export function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
}
