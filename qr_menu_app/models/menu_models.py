from django.db import models


class MenuItem(models.Model):
    item_name = models.CharField(max_length=20, null=True, blank=True)
    item_description = models.TextField(null=True, blank=True)
    food_price = models.FloatField(null=True, blank=True)
    discount_price = models.FloatField(null=True, blank=True)
    food_img = models.ImageField(null=True, blank=True, upload_to="index_slider/")
    new_item_boolean = models.BooleanField(default=False, null=True, blank=True)
    vegan_item_boolean = models.BooleanField(default=False, null=True, blank=True)
    menu_item_category = models.ForeignKey("ItemCategory", on_delete=models.CASCADE, related_name="menu_item_category",
                                           null=True,
                                           blank=True)
    active_boolean = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.item_name


class ItemCategory(models.Model):
    menu_item_relation = models.ForeignKey("MenuItem", on_delete=models.CASCADE, related_name="menu_item_relation")
    category_name = models.CharField(max_length=20, null=True, blank=True)
    active_boolean = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name
