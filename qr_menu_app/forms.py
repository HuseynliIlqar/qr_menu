from django import forms
from qr_menu_app.models.brand_customisation import BrandTheme
from qr_menu_app.models.navbar_model import NavbarSocialMedia


class NavbarSocialMediaForm(forms.ModelForm):
    class Meta:
        model = NavbarSocialMedia
        fields = ["social_media_icon", "social_media_link"]
        widgets = {
            "social_media_icon": forms.TextInput(attrs={"placeholder": "Platform adı", "class": "form-control", }),
            "social_media_link": forms.URLInput(attrs={"placeholder": "URL", "class": "form-control", }),
        }


class BrandThemeAdminForm(forms.ModelForm):
    class Meta:
        model = BrandTheme
        fields = "__all__"
        widgets = {
            "primary": forms.TextInput(attrs={"type": "color"}),
            "secondary": forms.TextInput(attrs={"type": "color"}),
            "background": forms.TextInput(attrs={"type": "color"}),
            "surface": forms.TextInput(attrs={"type": "color"}),
            "text": forms.TextInput(attrs={"type": "color"}),
            "muted": forms.TextInput(attrs={"type": "color"}),
            "border": forms.TextInput(attrs={"type": "color"}),
        }