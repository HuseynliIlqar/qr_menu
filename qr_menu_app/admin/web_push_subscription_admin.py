from django.contrib import admin

from qr_menu_app.models.web_push_subscription_model import WebPushSubscription


@admin.register(WebPushSubscription)
class WebPushSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['order', 'created_at']
