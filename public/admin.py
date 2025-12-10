from django.contrib import admin
from .models import Client, Domain


class DomainInLine(admin.TabularInline):
    model = Domain
    extra = 1
    max_num = 1


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("id","schema_name", "created_at", "updated_at")
    inlines = [DomainInLine]


# @admin.register(Domain)
# class DomainAdmin(admin.ModelAdmin):
#     list_display = ("tenant_id","domain", "tenant", "is_primary")
