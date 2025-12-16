from django.contrib import admin
from .models.navbar_model import MainSection, NavbarSocialMedia, InfoSection


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