from django.urls import path
from qr_menu_app.view.index_view import index_view
from qr_menu_app.view.panel_view import cashier_panel, customer_call_page, cashier_orders_list, create_order, \
    cashier_action, cashier_accept
from qr_menu_app.view.web_push_subscription_view import save_order_subscription

urlpatterns = [
    path('', index_view, name='home'),
    path("orders/<int:order_id>/push/subscribe/", save_order_subscription, name="save_order_subscription"),
    path("orders/create/", create_order),
    path("cashier/orders/accept/", cashier_accept),
    path("cashier/orders/<int:order_id>/action/", cashier_action),
    path("cashier/", cashier_panel, name="cashier_panel"),
    path("cashier/orders/accept/", cashier_accept),
    path("cashier/orders/", cashier_orders_list),
    path("customer/call/", customer_call_page, name="customer_call"),
]
