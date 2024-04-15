from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('cart/<int:food_id>/',views.CartView.as_view(),name='cart'),
    path('remove/<int:food_id>/',views.Remove_CartView.as_view(),name='remove_single_cart'),
    path('order/',views.OrderView.as_view(),name='order'),
]