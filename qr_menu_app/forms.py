from django import forms
from qr_menu_app.models.navbar_model import NavbarSocialMedia


class NavbarSocialMediaForm(forms.ModelForm):
    class Meta:
        model = NavbarSocialMedia
        fields = ["social_media_icon", "social_media_link"]
        widgets = {
            "social_media_icon": forms.TextInput(attrs={"placeholder": "Platform adı (məs: instagram)","class": "form-control",}),
            "social_media_link": forms.URLInput(attrs={"placeholder": "URL (məs: https://instagram.com/eco)","class": "form-control",}),
        }
