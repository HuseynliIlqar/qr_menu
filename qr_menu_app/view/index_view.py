from django.shortcuts import render

from qr_menu_app.forms import NavbarSocialMediaForm
from qr_menu_app.models.navbar_model import NavbarSocialMedia, NavbarItem


def index_view(request):
    navbar = NavbarItem.objects.first()
    social_media_navbar = NavbarSocialMedia.objects.all()
    form = NavbarSocialMediaForm()

    context = {
        'navbar': navbar,
        'social_media_navbar': social_media_navbar,
        'form': form,
    }

    return render(
        request,
        'index.html',
        context
    )

