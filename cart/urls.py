from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('cart/',views.CartView.as_view(),name='cart'),
    path('remove_single/',views.Remove_Cart.as_view(),name='remove_single_cart'),
    path('order/',views.OrderView.as_view(),name='order'),
]