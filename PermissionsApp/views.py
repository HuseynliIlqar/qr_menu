from django.shortcuts import render
from PermissionsApp.models import TestModel


def test_mvt(request):
    models = TestModel.objects.all()

    context = {
        "name": models
    }

    return render(
        request,
        "intex.html",
        context
    )