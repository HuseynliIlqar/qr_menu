from django.contrib import admin
from qr_menu_app.models import MenuItem, ItemCategory, MenuBadge


@admin.register(ItemCategory)
class ItemCategoryAdmin(admin.ModelAdmin):
    list_display = ("id","category_name", "sort_order", "is_active")
    list_editable = ("sort_order", "is_active")
    ordering = ("sort_order", "category_name")

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("id", "item_name", "category", "original_price", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("item_name",)
    filter_horizontal = ("badges",)
    readonly_fields = ("discount_amount",)


@admin.register(MenuBadge)
class MenuBadgeAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "sort_order", "is_active")
    list_editable = ("sort_order", "is_active")
    prepopulated_fields = {"slug": ("name",)}
