from django.core.exceptions import ValidationError
from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator

HEX_COLOR = RegexValidator(
    regex=r"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$",
    message="Hex rəng formatı səhvdir. Məs: #ff6a00"
)

class BrandTheme(models.Model):
    main_section = models.OneToOneField(
        "MainSection",
        on_delete=models.CASCADE,
        related_name="theme"
    )

    primary = models.CharField(max_length=7, validators=[HEX_COLOR], default="#ff6a00")
    secondary = models.CharField(max_length=7, validators=[HEX_COLOR], default="#98B795")

    background = models.CharField(max_length=7, validators=[HEX_COLOR], default="#FFF9F1")
    surface = models.CharField(max_length=7, validators=[HEX_COLOR], default="#FFFFFF")

    text = models.CharField(max_length=7, validators=[HEX_COLOR], default="#132017")
    muted = models.CharField(max_length=7, validators=[HEX_COLOR], default="#5B6B60")
    border = models.CharField(max_length=7, validators=[HEX_COLOR], default="#E7E3DA")
    radius = models.PositiveIntegerField(default=18, validators=[MinValueValidator(6), MaxValueValidator(40)])

    hero_overlay_alpha = models.FloatField(default=0.45, validators=[MinValueValidator(0.0), MaxValueValidator(0.85)])

    SHADOW_PRESETS = [
        ("soft", "Soft"),
        ("medium", "Medium"),
        ("strong", "Strong"),
        ("none", "None"),
    ]
    shadow_preset = models.CharField(max_length=10, choices=SHADOW_PRESETS, default="soft")

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.main_section} theme"

    @property
    def shadow_css(self) -> str:
        return {
            "none": "none",
            "soft": "0 10px 30px rgba(0,0,0,.08)",
            "medium": "0 14px 40px rgba(0,0,0,.12)",
            "strong": "0 18px 55px rgba(0,0,0,.18)",
        }.get(self.shadow_preset, "0 10px 30px rgba(0,0,0,.08)")


    def save(self, *args,**kwargs):
        if not self.pk:
            if BrandTheme.objects.count() >= 1:
                raise ValidationError("Yalnız 1 BrandTheme əlavə etməyə icazə verilir.")
        super().save(*args, **kwargs)