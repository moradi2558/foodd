from home.models                    import *
from.models                         import*
from django.contrib.auth.decorators import login_required
from rest_framework.views           import APIView
from rest_framework.response        import Response
from rest_framework                 import viewsets,status
from .serializers                   import *
# Create your views here.

class CartView(APIVew):
    def get(self,request,food_id):
        cart = Cart.objects.filter(food=food_id,user=request.user.id)
        data = CartSerializer(instance=cart,many=True)
        return Response(data.data,status=200)
    
    def post(self,request,food_id):
        data = Cart.objects.get(food=food_id,user=request.user.id)
        if data :
            data.quantity+=1
            ser_data = CartSerializer(instance=data,many=True)
            return Response(ser_data.data,status=200) 
        else:
            valid_data = CartSerializer(data=request.POST)
            if valid_data.is_valid:
                data=cleaned_data    
                main_data = Cart.objects.create(food=data['food'],user=request.user.id,quantity=data['quantity'])
                ser_data = CartSerializer(instance=main_data,many=True)
                return Response(ser_data.data,status=200)
            else:
                return Response(ser_data.error,status=400)
           
    
class Remove_Cart(APIView):
    def get(self,request,food_id):
        data = Cart.objects.get(food=food_id,user=request.user.id)
        if data.quantity >= 0 :
            data.quantity-=1
            return Response('being lower...')
        else :
            Cart.objects.remove(food=food_id,user=request.user.id)
            return Response('being removed...')
        
class OrderView(APIView):
    def get(self,request,order_id):
        order = Order.objects.get(id=order_id)
        data = OrderSerializer(instance=order,many=True)
        return Response(data.data,status=200)
    
    def post(self,request,order_id):
        ser_data = OrderSerializer(data=request.POST)
        if ser_data.is_valid():
            data = cleaned_data
            code = get_random_string
            main_data = Order.objects.create(user=request.user.id,code=code,
                                        f_name=data['f_name'],l_name=data['l_name'],
                                        address=data['address'],email=data['email'],
                                        food=data['food'],quantity=['quantity'],)
            ser_data = OrderSerializer(instance=main_data,many=True)
            return Response(ser_data.data,status=200)
        else:
            return Response(ser_data.error,status=400)    
    
    
            


        
    