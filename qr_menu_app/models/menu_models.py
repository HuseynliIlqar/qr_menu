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
    category_name = models.CharField(max_length=20, null=True, blank=True)
    active_boolean = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.category_name


class HeroSlide(models.Model):
    title_small = models.CharField(max_length=50, null=True, blank=True)
    title_big = models.CharField(max_length=120, null=True, blank=True)
    subtitle_big = models.CharField(max_length=120, null=True, blank=True)
    button_text = models.CharField(max_length=30, default="Learn More", null=True, blank=True)
    button_url = models.CharField(max_length=255, default="#", null=True, blank=True)
    image = models.ImageField(upload_to="hero_slides/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0, null=True, blank=True)
    is_active = models.BooleanField(default=True,)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title_big
