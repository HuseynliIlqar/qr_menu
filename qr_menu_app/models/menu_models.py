from django.db import models

class ItemCategory(models.Model):
    category_name = models.CharField(max_length=50, null=True, blank=True)
    category_image = models.ImageField(null=True, blank=True, upload_to="category_image/")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name


class MenuItem(models.Model):
    item_name = models.CharField(max_length=50, null=True, blank=True)
    item_description = models.TextField(null=True, blank=True)
    food_price = models.FloatField(null=True, blank=True)
    discount_price = models.FloatField(null=True, blank=True)
    food_img = models.ImageField(null=True, blank=True, upload_to="menu_items/")
    new_item_icon = models.BooleanField(default=False)
    vegan_item_icon = models.BooleanField(default=False)
    halal_item_icon = models.BooleanField(default=False)

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