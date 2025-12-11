from django.urls import path
from qr_menu_app.view.create_social_media_icon_function import create_social_media_link
from qr_menu_app.view.index_view import index_view
from qr_menu_app.view.update_page_h1 import update_page_h1

urlpatterns = [
    path('', index_view, name='home'),
    path("update_page/",update_page_h1,name="update_page"),
    path('create_social_media_icon/',create_social_media_link,name="create_social_media_link")
]