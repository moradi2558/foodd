from rest_framework import serializers
from . models import *

#serializers
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields ='__all__'
    
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'f_name','l_name','address','email','quantity',
        ]

