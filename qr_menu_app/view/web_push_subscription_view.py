import json
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from qr_menu_app.models import CustomerOrder
from qr_menu_app.services.webpush import upsert_order_subscription


@csrf_exempt
@require_POST
def save_order_subscription(request, order_id):
    try:
        data = json.loads(request.body)
        endpoint = data["endpoint"]
        keys = data["keys"]
        p256dh = keys["p256dh"]
        auth = keys["auth"]
    except (json.JSONDecodeError, KeyError, TypeError):
        return HttpResponseBadRequest("Invalid subscription payload")

    # order var?
    order = CustomerOrder.objects.filter(id=order_id).first()
    if not order:
        return HttpResponseBadRequest("Order not found")

    upsert_order_subscription(order_id, endpoint, p256dh, auth)
    return JsonResponse({"ok": True})
