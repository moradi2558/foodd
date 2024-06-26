from rest_framework import serializers
from . models import *
from home.serializers import* 

#serializers
class CartSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    class Meta:
        model = Cart
        fields = [
            'food','user','quantity','id',
        ]
    
        
class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = [
            'f_name','l_name','address','email','id',
        ]

class ItemOrderSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    cart = CartSerializer(read_only=True)
   
    class Meta:
        model = ItemOrder
        fields = [
           'food','cart','user','quantity',
        ]