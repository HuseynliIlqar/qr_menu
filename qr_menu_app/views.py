from .models.navbar_model import NavbarItem, NavbarSocialMedia
from django.shortcuts import render


def home_view(request):
    navbar = NavbarItem.objects.first()
    social_media_navbar = NavbarSocialMedia.objects.all()

    context = {
        'navbar': navbar,
        'social_media_navbar': social_media_navbar,
    }

    return render(
        request,
        'index.html',
        context
    )

