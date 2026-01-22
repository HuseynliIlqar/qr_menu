import json
import logging
from django.conf import settings
from pywebpush import webpush, WebPushException
from qr_menu_app.models import CustomerOrder, WebPushSubscription

logger = logging.getLogger(__name__)


def send_push(subscription, title, body):
    payload = json.dumps({"title": title, "body": body})

    try:
        webpush(
            subscription_info=subscription.as_dict(),
            data=payload,
            vapid_private_key=settings.VAPID_PRIVATE_KEY,
            vapid_claims=settings.VAPID_CLAIMS,
        )
        return True
    except WebPushException as e:
        logger.warning(
            "WebPush failed endpoint=%s err=%s",
            getattr(subscription, "endpoint", None), str(e)
        )
        return False


def upsert_order_subscription(order_id, endpoint, p256dh, auth):
    order = CustomerOrder.objects.get(id=order_id)
    sub, _ = WebPushSubscription.objects.update_or_create(
        order=order,
        endpoint=endpoint,
        defaults={"p256dh": p256dh, "auth": auth},
    )
    return sub
