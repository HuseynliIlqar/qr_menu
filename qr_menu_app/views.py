from django.shortcuts import render
from .models.navbar_model import NavbarItem

def home_view(request):

    navbar = NavbarItem.objects.all()
    context = {'navbar': navbar}

    return render(
        request,
        'index.html',
        context
    )