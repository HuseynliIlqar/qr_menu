from django.contrib import admin
from .models.navbar_model import NavbarItem


@admin.register(NavbarItem)
class NavbarItemAdmin(admin.ModelAdmin):
    list_display = ('restoran_name', 'restoran_logo')
