from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden
from django.views.decorators.http import require_POST
from .models.navbar_model import NavbarItem
from django.shortcuts import render

def home_view(request):

    navbar = NavbarItem.objects.get(id=1)
    context = {'navbar': navbar}

    return render(
        request,
        'index.html',
        context
    )

@login_required
@require_POST
def update_page(request):

    if not request.user.is_staff or not request.user.is_superuser:
        return HttpResponseForbidden("You do not have permission to perform this action.")

    editable_name = request.POST.get("editable_name").translate(str.maketrans("", "", "?!."))

    object_name = NavbarItem.objects.get(id=1)
    object_name.restoran_name = editable_name
    object_name.save()

    return JsonResponse({
        "status": "success",
        "new_name": editable_name
    })
