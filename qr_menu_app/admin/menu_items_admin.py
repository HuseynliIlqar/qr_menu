from qr_menu_app.models.menu_models import MenuItem, ItemCategory
from django.contrib import admin


class MenuItemCategoryInline(admin.TabularInline):
    model = ItemCategory
    extra = 0
    max_num = 1


@admin.register(MenuItem)
class MenuItenAdmin(admin.ModelAdmin):
    list_display = ("id", "item_name", "food_price", "active_boolean")
    list_editable = ("active_boolean", "food_price")
    inlines = [MenuItemCategoryInline]