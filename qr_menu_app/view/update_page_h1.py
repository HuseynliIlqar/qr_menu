from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.http import require_POST
from qr_menu_app.models.navbar_model import MainSection



@login_required
@require_POST
def update_page_h1(request):

    editable_field = None

    if not request.user.is_staff or not request.user.is_superuser:
        return HttpResponseForbidden("You do not have permission to perform this action.")

    if request.POST.get("editable_name"):
        editable_field = request.POST.get("editable_name").translate(str.maketrans("", "", "?!."))

        object_name = MainSection.objects.first()
        object_name.restoran_name = editable_field
        object_name.save()

    if request.POST.get("main_section_h1"):
        editable_field = request.POST.get("main_section_h1").translate(str.maketrans("", "", "?!."))

        object_name = MainSection.objects.first()
        object_name.restoran_main_text = editable_field
        object_name.save()

    if request.POST.get("main_section_sub"):
        editable_field = request.POST.get("main_section_sub").translate(str.maketrans("", "", "?!."))

        object_name = MainSection.objects.first()
        object_name.restoran_sub_text = editable_field
        object_name.save()

    # print("DEBUG method:", request.method)
    # print("DEBUG content_type:", request.content_type)
    # print("DEBUG POST:", dict(request.POST))
    # print("DEBUG body raw:", request.body[:200])

    if editable_field is None:
        return JsonResponse({"error": "editable_name missing"}, status=400)

    return JsonResponse({
        "status": "success",
        "new_name": editable_field
    })
