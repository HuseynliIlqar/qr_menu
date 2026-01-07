from django.contrib import admin
from django.db import models
from django.forms import Textarea
from qr_menu_app.models.navbar_model import HeroSlide
from qr_menu_app.models.navbar_model import NavbarSocialMedia, InfoSection, MainSection


class SocialMediaInLine(admin.TabularInline):
    model = NavbarSocialMedia
    extra = 0
    max_num = 3

class InfoSectionInLine(admin.TabularInline):
    model = InfoSection
    extra = 0
    max_num = 10

    formfield_overrides = {
        models.TextField: {
            "widget": Textarea(attrs={
                "rows": 2,
                "cols": 30,
                "style": "resize: vertical;"
            })
        }
    }


class HeroSliderInLine(admin.TabularInline):
    model = HeroSlide
    extra = 0
    max_num = 5

@admin.register(MainSection)
class NavbarItemAdmin(admin.ModelAdmin):
    list_display = ("id", 'restoran_name', 'restoran_logo')
    inlines = [SocialMediaInLine, InfoSectionInLine, HeroSliderInLine]
