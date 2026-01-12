from django.db import models


class MenuBadge(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(unique=True)
    icon_svg = models.TextField(blank=True)
    color = models.CharField(max_length=20, blank=True)
    is_active = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name
