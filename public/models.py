from django_tenants.models import TenantMixin, DomainMixin
from django.db import models


class Client(TenantMixin):
    name = models.CharField(max_length=100, unique=True)  # Tenant adı üçün tələb olunur
    schema_name = models.CharField(max_length=63, unique=True)  # Sxem adı üçün tələb olunur
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    auto_create_schema = True


class Domain(DomainMixin):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
