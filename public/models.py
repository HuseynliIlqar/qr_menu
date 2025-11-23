from django_tenants.models import TenantMixin, DomainMixin
from django.db import models


class Client(TenantMixin):
    name = models.CharField(max_length=100)
    created_at = models.DateField(auto_now_add=True)


    auto_create_schema = True

    def __str__(self):
        return self.name

class Domain(DomainMixin):
    pass