import json
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.shortcuts import render
from django.utils import timezone
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from qr_menu_app.models import CustomerOrder
from qr_menu_app.services.webpush import send_push


def _require_cashier(request):
    return request.user.is_authenticated and request.user.is_staff


@require_GET
def customer_call_page(request):
    order_id = request.session.get("customer_order_id")
    order = CustomerOrder.objects.filter(id=order_id).first() if order_id else None

    if not order:
        order = CustomerOrder.create_with_unique_code()
        request.session["customer_order_id"] = order.id

    qr_payload = json.dumps({
        "order_code": order.order_code,
        "customer_token": str(order.customer_token),
    })

    return render(request, "index.html", {
        "order": order,
        "qr_payload": qr_payload,
        "WEBPUSH_VAPID_PUBLIC_KEY": settings.WEBPUSH_VAPID_PUBLIC_KEY,
    })


@csrf_exempt
@require_POST
def create_order(request):
    order = CustomerOrder.create_with_unique_code()
    return JsonResponse({
        "order_id": order.id,
        "order_code": order.order_code,
        "customer_token": str(order.customer_token),
    })


@require_GET
def cashier_panel(request):
    if not _require_cashier(request):
        return HttpResponseForbidden("Forbidden")

    orders = CustomerOrder.objects.filter(
        accepted_at__isnull=False
    ).order_by("-accepted_at")[:100]

    return render(request, "panel.html", {"orders": orders})


@csrf_exempt
@require_POST
def cashier_accept(request):
    if not _require_cashier(request):
        return HttpResponseForbidden("Forbidden")

    try:
        data = json.loads(request.body)
        order_code = data["order_code"]
        customer_token = data["customer_token"]
        floor = data.get("floor")
        customer_name = (data.get("customer_name") or "").strip()
    except (json.JSONDecodeError, KeyError):
        return HttpResponseBadRequest("Invalid payload")

    order = CustomerOrder.objects.filter(
        order_code=order_code,
        customer_token=customer_token
    ).first()

    if not order:
        return HttpResponseBadRequest("Order not found")

    if floor is not None and str(floor).strip() != "":
        order.floor = int(floor)

    if customer_name:
        order.customer_name = customer_name

    # ✅ ƏSAS: scan edildisə accepted_at dolmalıdır
    order.accepted_at = timezone.now()

    order.save(update_fields=["floor", "customer_name", "accepted_at"])

    return JsonResponse({
        "ok": True,
        "order": {
            "id": order.id,
            "order_code": order.order_code,
            "status": order.status,
            "floor": order.floor,
            "customer_name": order.customer_name,
            "accepted_at": order.accepted_at.isoformat() if order.accepted_at else None,
        }
    })


@csrf_exempt
@require_POST
def cashier_action(request, order_id):
    if not _require_cashier(request):
        return HttpResponseForbidden("Forbidden")

    try:
        data = json.loads(request.body)
        action = data["action"]
    except (json.JSONDecodeError, KeyError):
        return HttpResponseBadRequest("Invalid payload")

    order = CustomerOrder.objects.filter(
        id=order_id,
        accepted_at__isnull=False
    ).first()

    if not order:
        return HttpResponseBadRequest("Order not found")

    now = timezone.now()

    if action == "call":
        order.status = CustomerOrder.Status.CALLED
        order.called_at = now
        title = "Sifariş hazırdır"
        body = f"Zəhmət olmasa kassaya yaxınlaşın. Kod: {order.order_code}"
        order.save(update_fields=["status", "called_at"])

    elif action == "deliver":
        order.status = CustomerOrder.Status.DELIVERED
        order.delivered_at = now
        title = "Sifariş təhvil verildi"
        body = f"Təşəkkürlər. Kod: {order.order_code}"
        order.save(update_fields=["status", "delivered_at"])

    elif action == "reject":
        order.status = CustomerOrder.Status.REJECTED
        order.rejected_at = now
        title = "Sifariş ləğv edildi"
        body = f"Zəhmət olmasa kassaya yaxınlaşın. Kod: {order.order_code}"
        order.save(update_fields=["status", "rejected_at"])
    else:
        return HttpResponseBadRequest("Unknown action")

    sent = 0
    for sub in order.push_subscriptions.all():
        if send_push(sub, title, body):
            sent += 1

    return JsonResponse({"ok": True, "sent": sent, "status": order.status})


@require_GET
def cashier_orders_list(request):
    if not _require_cashier(request):
        return HttpResponseForbidden("Forbidden")

    qs = CustomerOrder.objects.filter(
        accepted_at__isnull=False
    ).order_by("-accepted_at")[:100]

    data = [{
        "id": o.id,
        "order_code": o.order_code,
        "status": o.status,
        "floor": o.floor,
        "customer_name": o.customer_name,
        "created_at": o.created_at.isoformat(),
        "accepted_at": o.accepted_at.isoformat() if o.accepted_at else None,
    } for o in qs]

    return JsonResponse({"ok": True, "orders": data})
