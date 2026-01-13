const labels = {
    spicy: "Spicy",
    vegan: "Vegan",
    popular: "Popular",
    "chef-special": "Chef Special",
};

export function getBadgeLabel(slug) {
    return labels[slug] || slug;
}
