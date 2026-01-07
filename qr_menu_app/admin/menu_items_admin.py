from django.contrib import admin
from qr_menu_app.models import MenuItem, ItemCategory


@admin.register(ItemCategory)
class ItemCategoryAdmin(admin.ModelAdmin):
    list_display = ("category_name", "is_active", "created_at")

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("item_name", "category", "food_price", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("item_name",)
