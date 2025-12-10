from django.contrib import admin
from .models.navbar_model import NavbarItem, NavbarSocialMedia


class SocialMediaInLine(admin.TabularInline):
    model = NavbarSocialMedia
    extra = 0
    max_num = 3

@admin.register(NavbarItem)
class NavbarItemAdmin(admin.ModelAdmin):
    list_display = ("id",'restoran_name', 'restoran_logo')
    inlines = [SocialMediaInLine]

