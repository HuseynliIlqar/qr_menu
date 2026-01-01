from django.contrib import admin
from qr_menu_app.forms import BrandThemeAdminForm
from qr_menu_app.models.brand_customisation import BrandTheme


@admin.register(BrandTheme)
class BrandThemeAdmin(admin.ModelAdmin):
    form = BrandThemeAdminForm
    list_display = ("main_section", "primary", "background", "shadow_preset", "updated_at")
    search_fields = ("main_section__restoran_name",)
