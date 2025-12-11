from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.http import require_POST
from qr_menu_app.models.navbar_model import NavbarItem


@login_required
@require_POST
def update_page_h1(request):
    if not request.user.is_staff or not request.user.is_superuser:
        return HttpResponseForbidden("You do not have permission to perform this action.")

    editable_name = request.POST.get("editable_name").translate(str.maketrans("", "", "?!."))

    object_name = NavbarItem.objects.first()
    object_name.restoran_name = editable_name
    object_name.save()

    return JsonResponse({
        "status": "success",
        "new_name": editable_name
    })
