from django.db import models


class WebPushSubscription(models.Model):
    order = models.ForeignKey("CustomerOrder", on_delete=models.CASCADE, related_name="push_subscriptions")
    endpoint = models.URLField()
    p256dh = models.CharField(max_length=255)
    auth = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("order", "endpoint")

    def as_dict(self):
        return {
            "endpoint": self.endpoint,
            "keys": {
                "p256dh": self.p256dh,
                "auth": self.auth,
            },
        }
