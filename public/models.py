from django_tenants.models import TenantMixin, DomainMixin
from django.db import models


class Client(TenantMixin):
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    auto_create_schema = True




class Domain(DomainMixin):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.domain