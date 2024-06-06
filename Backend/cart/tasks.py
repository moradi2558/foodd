from celery import shared_task
from .views import *


@shared_task
def delete_cart_celery(food_id,user):
    data = Cart.objects.get(food=food_id,user=user).delete()