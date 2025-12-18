from django.contrib import admin
from qr_menu_app.models.navbar_model import HeroSlide
from qr_menu_app.models.navbar_model import NavbarSocialMedia, InfoSection, MainSection


class SocialMediaInLine(admin.TabularInline):
    model = NavbarSocialMedia
    extra = 0
    max_num = 3

class InfoSectionInLine(admin.TabularInline):
    model = InfoSection
    extra = 0
    max_num = 3


@admin.register(MainSection)
class NavbarItemAdmin(admin.ModelAdmin):
    list_display = ("id", 'restoran_name', 'restoran_logo', "restoran_main_text", "restoran_sub_text",
                    "restoran_main_slider_image")
    inlines = [SocialMediaInLine, InfoSectionInLine]


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ("id", "title_big","is_active")
    search_fields = ("title_big", "title_small")