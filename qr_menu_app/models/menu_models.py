from decimal import Decimal
from django.db import models
from django.db.models import F, Value
from django.db.models.functions import Coalesce
from django.utils.text import slugify


class ItemCategory(models.Model):
    category_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=60, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "category_name"]

    def __str__(self):
        return self.category_name

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.category_name) or "category"
            slug = base
            i = 2
            while ItemCategory.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{i}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)


class MenuItem(models.Model):
    item_name = models.CharField(max_length=50, null=True, blank=True)
    item_description = models.CharField(null=True, blank=True)
    item_ingredients = models.CharField(max_length=100, null=True, blank=True)
    item_waring = models.CharField(max_length=150, null=True, blank=True)
    original_price = models.DecimalField(null=True, blank=True, max_digits=6, decimal_places=2)
    discount_price = models.DecimalField(null=True, blank=True, max_digits=6, decimal_places=2)
    food_image = models.ImageField(null=True, blank=True, upload_to="menu_items/")

    badges = models.ManyToManyField(
        "MenuBadge",
        blank=True,
        related_name="menu_items"
    )


    discount_amount = models.GeneratedField(
        expression=Coalesce(F("original_price"), Value(Decimal("0.00")))
                   - Coalesce(F("discount_price"), Value(Decimal("0.00"))),
        output_field=models.DecimalField(max_digits=6, decimal_places=2),
        db_persist=True,
    )

    category = models.ForeignKey(
        ItemCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="items",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item_name