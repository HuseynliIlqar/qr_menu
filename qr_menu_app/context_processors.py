from django.conf import settings

def webpush_keys(request):
    return {
        "WEBPUSH_VAPID_PUBLIC_KEY": getattr(settings, "WEBPUSH_VAPID_PUBLIC_KEY", ""),
    }
