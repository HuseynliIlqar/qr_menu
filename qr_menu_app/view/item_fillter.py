from qr_menu_app.models import ItemCategory, MenuItem
from django.shortcuts import render


def menu_page(request):
    items_categorys = (
        ItemCategory.objects
        .filter(is_active=True)
        .order_by("sort_order", "category_name")
    )

    menu_items = (
        MenuItem.objects
        .filter(is_active=True, category__is_active=True)
        .select_related("category")
        .order_by("category__sort_order", "item_name")
    )

    return render(request, "index.html", {
        "items_categorys": items_categorys,
        "menu_items": menu_items,
    })