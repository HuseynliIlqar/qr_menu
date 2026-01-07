from django.core.exceptions import ValidationError
from django.db import models


class MainSection(models.Model):
    restoran_name = models.CharField(max_length=200, null=True, blank=True)
    restoran_logo = models.ImageField(upload_to='restoran_logos/', null=True, blank=True)
    is_active = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.restoran_name

    def save(self, *args, **kwargs):
        if not self.pk:
            if MainSection.objects.count() >= 1:
                raise ValidationError("Yalnız 1 Main Section əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)


class InfoSection(models.Model):
    class Status(models.TextChoices):
        DEFAULT = "circle-question"
        WIFI_ICON = "wifi"
        PHONE_ICON = "phone"
        LOCATION_ICON = "location-dot"
        DELVING_ICON = "truck"
        WORKING_HOURS_ICON = "clock"
        PET_FRENDLY_ICON = "paw"
        VEGAN_ICON = "leaf"
        INFO_ICON = "circle-info"

    info_section = models.ForeignKey("MainSection", on_delete=models.CASCADE, related_name="main_section")
    info_section_text = models.CharField(max_length=15, null=True, blank=True)
    info_section_sub_text = models.TextField(max_length=100, null=True, blank=True)
    info_section_icons = models.CharField(max_length=20, choices=Status.choices, default=Status.DEFAULT)
    is_active = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.info_section_text

    # def save(self, *args, **kwargs):
    #     if not self.pk:
    #         if InfoSection.objects.count() >= 5:
    #             raise ValidationError("Yalnız 5 social media əlavə etməyə icazə verilir.")
    #     super().save(*args, **kwargs)


class NavbarSocialMedia(models.Model):
    main_section = models.ForeignKey("MainSection", on_delete=models.CASCADE, related_name='social_medias')
    social_media_icon = models.CharField(max_length=100, null=True, blank=True)
    social_media_link = models.URLField(max_length=200, null=True, blank=True)
    is_active = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.social_media_icon

    def save(self, *args, **kwargs):
        if not self.pk:
            if NavbarSocialMedia.objects.count() >= 3:
                raise ValidationError("Yalnız 3 social media əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)


class HeroSlide(models.Model):
    main_section = models.ForeignKey("MainSection", on_delete=models.CASCADE, related_name='hero_slide')
    title_small = models.CharField(max_length=50, null=True, blank=True, default='Default text')
    title_big = models.CharField(max_length=120, null=True, blank=True, default='Default text')
    subtitle_big = models.CharField(max_length=120, null=True, blank=True, default='Default text')
    button_text = models.CharField(max_length=30, null=True, blank=True, default='Default button')
    button_url = models.CharField(max_length=255, null=True, blank=True, default='#')
    image = models.ImageField(upload_to="hero_slides/", null=True, blank=True)
    is_active = models.BooleanField(default=True, )

    def __str__(self):
        return self.title_big


    def save(self, *args,**kwargs):
        if not self.pk:
            if HeroSlide.objects.count() >= 5:
                raise ValidationError("Yalnız 5 Slider əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)