from django.urls import path
from qr_menu_app.view.index_view import index_view

urlpatterns = [
    path('', index_view, name='home'),
]