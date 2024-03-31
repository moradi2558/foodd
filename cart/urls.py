from django.urls import path
from . import views

app_name = 'cart'

urlpatterns = [
    path('cart/<int:food_id>/<int:user_id>/',views.CartView.as_view(),name='cart'),
    path('remove_single/<int:food_id>/<int:user_id>/',views.Remove_Cart.as_view(),name='remove_single_cart'),
    path('order/<int:food_id>/<int:user_id>/',views.OrderView.as_view(),name='order'),
]