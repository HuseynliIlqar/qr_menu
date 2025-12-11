from django.shortcuts import render

from qr_menu_app.models.navbar_model import NavbarSocialMedia, NavbarItem


def index_view(request):
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

