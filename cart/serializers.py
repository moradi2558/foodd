from rest_framework import serializers
from . models import *
from home.serializers import* 

#serializers
class CartSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    class Meta:
        model = Cart
        fields = [
            'food','user','quantity'
        ]
    
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'f_name','l_name','address','email','quantity',
        ]

