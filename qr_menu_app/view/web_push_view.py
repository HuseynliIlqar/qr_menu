import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from qr_menu_app.services.webpush import upsert_order_subscription


@csrf_exempt
@require_POST
def save_order_subscription(request, order_id):
    try:
        data = json.loads(request.body)
        endpoint = data["endpoint"]
        p256dh = data["keys"]["p256dh"]
        auth = data["keys"]["auth"]
    except (json.JSONDecodeError, KeyError):
        return HttpResponseBadRequest("Invalid subscription payload")

    upsert_order_subscription(order_id, endpoint, p256dh, auth)
    return JsonResponse({"ok": True})
