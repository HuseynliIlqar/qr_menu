from django.db import models
from django.core.exceptions import ValidationError


class MainSection(models.Model):
    restoran_name = models.CharField(max_length=200, null=True, blank=True)
    restoran_logo = models.ImageField(upload_to='restoran_logos/', null=True, blank=True)
    restoran_main_text = models.CharField(max_length=100, null=True,blank=True)
    restoran_sub_text = models.CharField(max_length=100, null=True, blank=True)
    restoran_main_slider_image = models.ImageField(upload_to='restoran_main_slider/', null=True, blank=True)

    def __str__(self):
        return self.restoran_name


    def save(self, *args, **kwargs):
        if not self.pk:
            if MainSection.objects.count() >= 1:
                raise ValidationError("Yalnız 1 Main Section əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)


class InfoSection(models.Model):
    main_section = models.ForeignKey("MainSection", on_delete=models.CASCADE,related_name="main_section")
    main_text = models.CharField(max_length=20, null=True, blank=True)
    sub_text = models.CharField(max_length=100, null=True, blank=True)


    def __str__(self):
        return self.main_text

    def save(self, *args, **kwargs):
        if not self.pk:
            if InfoSection.objects.filter(restoran=self.main_section).count() >= 3:
                raise ValidationError("Yalnız 3 social media əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)


class NavbarSocialMedia(models.Model):
    main_section = models.ForeignKey("MainSection", on_delete=models.CASCADE, related_name='social_medias')
    social_media_icon = models.CharField(max_length=100, null=True, blank=True)
    social_media_link = models.URLField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.social_media_icon

    def save(self, *args, **kwargs):
        if not self.pk:
            if NavbarSocialMedia.objects.filter(main_section=self.main_section).count() >= 3:
                raise ValidationError("Yalnız 3 social media əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)