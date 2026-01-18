from django.shortcuts import render
from qr_menu_app.models import ItemCategory, MenuItem
from qr_menu_app.models.navbar_model import NavbarSocialMedia, MainSection, InfoSection, HeroSlide


def index_view(request):
    navbar = MainSection.objects.first()

    social_media_qs = NavbarSocialMedia.objects.all()
    social_media_count = social_media_qs.count()

    info_section_obj = InfoSection.objects.all()
    info_section_count = info_section_obj.count()

    slides = HeroSlide.objects.filter(is_active=True).order_by('id')

    items_category = ItemCategory.objects.filter(is_active=True)

    menu_items = MenuItem.objects.filter(is_active=True)

    can_add_info_section = (
        (request.user.is_staff or request.user.is_superuser) and info_section_count < 5
    )

    can_add_social_media = (
        (request.user.is_staff or request.user.is_superuser)
        and social_media_count < 3
    )



    context = {
        "navbar": navbar,
        "social_media_navbars": social_media_qs,
        "can_add_social_media": can_add_social_media,
        "info_sections": info_section_obj,
        "can_add_info_sections": can_add_info_section,
        "slides": slides,
        "items_categorys": items_category,
        "menu_items": menu_items,
    }
    return render(request, "index.html", context)



