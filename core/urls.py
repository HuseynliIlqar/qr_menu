from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('permissions/', include('PermissionsApp.urls')),
    path('qr_menu/', include('QR_menu.urls')),
]
