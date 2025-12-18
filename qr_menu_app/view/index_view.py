from django.shortcuts import render
from qr_menu_app.forms import NavbarSocialMediaForm
from qr_menu_app.models.menu_models import HeroSlide
from qr_menu_app.models.navbar_model import NavbarSocialMedia, MainSection, InfoSection


def index_view(request):
    navbar = MainSection.objects.first()
    social_media_navbar = NavbarSocialMedia.objects.all()
    info_section_obj = InfoSection.objects.all()
    form = NavbarSocialMediaForm()
    slides = HeroSlide.objects.filter(is_active=True)

    context = {
        'navbar': navbar,
        'social_media_navbar': social_media_navbar,
        'form': form,
        "info_sections":info_section_obj,
        "slides": slides,
    }

    return render(
        request,
        'index.html',
        context
    )

