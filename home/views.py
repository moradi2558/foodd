from django.shortcuts           import get_object_or_404,render
from rest_framework.views       import APIView
from rest_framework.response    import Response
from rest_framework             import viewsets,status
from .serializers               import *
from .models                    import *
# Create your views here.

class HomeView(APIView):
    def get(self,request):
        category = Category.objects.all().order_by('create')
        data = CategorySerializer(instance=category,many=True)
        food = Food.objects.all()
        food_data = FoodSerializer(instance=food,many=True)
        context = {
            'category':data.data,
            'food':food_data.data,
        }
        return Response(context,status=200)
    
class FoodView(APIView):
    def get(self,request,category_id):
        category = Category.objects.all().order_by('create')
        data = CategorySerializer(instance=category,many=True)
        food = Food.objects.filter(category=category_id)
        food_data = FoodSerializer(instance=food,many=True)
        context = {
            'category':data.data,
            'food':food_data.data,
        }
        return Response(context,status=200)