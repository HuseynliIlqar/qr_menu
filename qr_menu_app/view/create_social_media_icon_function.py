from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.http import require_POST
from qr_menu_app.models.navbar_model import NavbarSocialMedia


@login_required
@require_POST
def create_social_media_link(request):
    if not request.user.is_staff or not request.user.is_superuser:
        return HttpResponseForbidden("You do not have permission to perform this action.")

    social_media_icon = request.POST.get("social_media_icon")
    social_media_link = request.POST.get("social_media_link")

    if not social_media_link:
        return JsonResponse({"error": "Link required"}, status=400)

    NavbarSocialMedia.objects.create(
        social_media_icon=social_media_icon,
        social_media_link=social_media_link
    )

    return JsonResponse({"status": "ok"},status=200)
