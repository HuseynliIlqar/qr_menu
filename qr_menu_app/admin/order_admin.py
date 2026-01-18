from django.contrib import admin
from qr_menu_app.models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_code', 'customer_name', 'status', 'created_at']
    readonly_fields = ['created_at','rejected_at','called_at','delivered_at']
