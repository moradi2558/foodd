from rest_framework import serializers
from . models import *

#serializers

class CartSerializer(serializers.ModelsSerializer):
    class Meta:
        model = Cart
        fields = [
            'food','quantity',
        ]
        
class OrderSerializer(serializers.ModelsSerializer):
    class Meta:
        model = Order
        fields = '__all__'

