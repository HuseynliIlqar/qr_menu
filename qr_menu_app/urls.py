from django.urls import path
from .views import home_view, update_page

urlpatterns = [
    path('', home_view, name='home'),
    path("update_page/",update_page,name="update_page"),
]