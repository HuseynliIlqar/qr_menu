from django.urls import path
from qr_menu_app.view.index_view import index_view
from qr_menu_app.view.web_push_view import save_order_subscription

urlpatterns = [
    path('', index_view, name='home'),
    path("orders/<int:order_id>/push/subscribe/", save_order_subscription),

]
