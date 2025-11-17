from django.urls import path
from . import views

urlpatterns = [
    path("",views.test_mvt,name="test_mvt"),
]
