from django.db import models
from django.core.exceptions import ValidationError


class NavbarItem(models.Model):
    restoran_name = models.CharField(max_length=200, null=True, blank=True)
    restoran_logo = models.ImageField(upload_to='restoran_logos/', null=True, blank=True)

    def __str__(self):
        return self.restoran_name


class NavbarSocialMedia(models.Model):
    restoran = models.ForeignKey("NavbarItem", on_delete=models.CASCADE, related_name='social_medias')
    social_media_icon = models.CharField(max_length=100, null=True, blank=True)
    social_media_link = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.social_media_icon

    def save(self, *args, **kwargs):
        if not self.pk:
            if NavbarSocialMedia.objects.filter(restoran=self.restoran).count() >= 3:
                raise ValidationError("Yalnız 3 social media əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)

