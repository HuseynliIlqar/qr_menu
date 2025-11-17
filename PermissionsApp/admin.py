from django.contrib import admin
from .models import TestModel


@admin.register(TestModel)
class TestNameAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone")