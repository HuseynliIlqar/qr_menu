from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.shortcuts import redirect
from django.views.decorators.http import require_POST
from qr_menu_app.models import HeroSlide


@login_required
@require_POST
def add_index_slider(request):

    if not (request.user.is_staff or request.user.is_superuser):
        return HttpResponseForbidden(status=403)

    HeroSlide.objects.create()

    return redirect('home')