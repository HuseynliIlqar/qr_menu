from django.urls import path

from qr_menu_app.view import barmen_admin
from qr_menu_app.view.create_social_media_icon_function import add_social_media, delete_social_media
from qr_menu_app.view.index_slider_view import add_index_slider
from qr_menu_app.view.index_view import index_view
from qr_menu_app.view.update_page_h1 import update_page_h1

urlpatterns = [
    path('', index_view, name='home'),
    path("update_page/", update_page_h1, name="update_page"),
    path("navbar/<int:navbar_id>/social-media/add/", add_social_media, name="add_social_media"),
    path("social-media/<int:pk>/delete/",delete_social_media,name="delete_social_media"),
    path("add_index_slider/", add_index_slider, name="add_index_slider"),
    path("barmen_admin/",barmen_admin,name="barmen_admin"),
]