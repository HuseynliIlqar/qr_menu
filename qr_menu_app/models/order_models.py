import random
import uuid
from django.db import models


def generate_5_digit_code():
    return f"{random.randint(10000, 99999)}"


class CustomerOrder(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        REJECTED = "rejected", "Rejected"
        CALLED = "called", "Called"
        DELIVERED = "delivered", "Delivered"

    order_code = models.CharField(max_length=5, unique=True, db_index=True)
    customer_token = models.UUIDField(default=uuid.uuid4, editable=False, db_index=True)

    customer_name = models.CharField(max_length=80, blank=True)
    floor = models.PositiveSmallIntegerField(null=True, blank=True)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)

    accepted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    rejected_at = models.DateTimeField(null=True, blank=True)
    called_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)

    @classmethod
    def create_with_unique_code(cls):
        for _ in range(30):
            code = generate_5_digit_code()
            if not cls.objects.filter(order_code=code).exists():
                return cls.objects.create(order_code=code)
        raise RuntimeError("Unique 5-digit code yaradıla bilmədi.")