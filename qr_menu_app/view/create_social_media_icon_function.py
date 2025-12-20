from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.http import require_POST

from qr_menu_app.forms import NavbarSocialMediaForm
from qr_menu_app.models.navbar_model import MainSection, NavbarSocialMedia


@login_required
@require_POST
def add_social_media(request, navbar_id):
    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponseForbidden(status=403)

    navbar = get_object_or_404(MainSection, id=navbar_id)

    if request.method == "POST":
        form = NavbarSocialMediaForm(request.POST)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.main_section = navbar
            obj.save()
            return redirect("home")
    else:
        form = NavbarSocialMediaForm()

    return render(request, "index.html", {"form": form, "navbar": navbar})


@login_required
@require_POST
def delete_social_media(request, pk):
    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponseForbidden(status=403)

    obj = get_object_or_404(NavbarSocialMedia, pk=pk)
    obj.delete()
    return redirect("home")
