from home.models                    import *
from.models                         import *
from .serializers                   import *
from rest_framework.views           import APIView
from rest_framework.response        import Response
from django.contrib.auth.decorators import login_required
from rest_framework                 import viewsets,status
from rest_framework.permissions     import IsAuthenticated
from django.utils.crypto            import get_random_string
# Create your views here.

class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request,food_id):
        if request.user.is_authenticated:
            cart = Cart.objects.filter(user=request.user)
            data = CartSerializer(instance=cart,many=True)
            return Response(data.data,status=200)
        return Response('fail')
    
    def post(self,request,food_id):
        
        """
        private
        
        create cart 
        
        need : quantity
        """
        food = Food.objects.get(id=food_id)
        if Cart.objects.filter(food=food_id,user=request.user).exists():
            data = Cart.objects.get(food=food_id,user=request.user)
            data.quantity +=1
            data.save()
            data = Cart.objects.filter(user=request.user)
            ser_data = CartSerializer(instance=data,many=True)
            return Response(ser_data.data,status=200) 
        else:    
            main_data = Cart.objects.create(food=food,user=request.user,quantity=1)
            ser_data = Cart.objects.filter(user=request.user)
            real_data = CartSerializer(instance=ser_data,many=True)
            return Response(real_data.data,status=200)
        return Response('fail')
           
    
class Remove_CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request,food_id):
        data = Cart.objects.get(food=food_id,user=request.user)
        if data.quantity > 1 :
            data.quantity -= 1
            data.save()
            return Response('being lower...')
        else:
            Cart.objects.get(food=food_id,user=request.user).delete()
            return Response('being removed...')
      
    def delete(self,request,food_id):
        data = Cart.objects.get(food=food_id,user=request.user).delete()
        return Response('item being deleted')
    
class OrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        Cart.objects.filter(user = request.user).delete()
        Order.objects.filter(user = request.user).delete()
        ItemOrder.objects.filter(user = request.user).delete()
        return Response({'order,itemorder,cart has been delete'},status=200)
    
    def post(self,request):
        """
        private
        
        create order 
        
        need : f_name,l_name,address,email,quantity
        """
        ser_data = OrderSerializer(data=request.POST)
        if ser_data.is_valid():
            data = ser_data.validated_data
            code = get_random_string
            if Order.objects.filter(user=request.user).exists():
                Order.objects.update(user=request.user,code=code,
                                f_name=data['f_name'],l_name=data['l_name'],
                                address=data['address'],email=data['email'],)
            else:
                Order.objects.create(user=request.user,code=code,
                                f_name=data['f_name'],l_name=data['l_name'],
                                address=data['address'],email=data['email'],)
            cart = Cart.objects.filter(user=request.user)
            order = Order.objects.get(user = request.user)
            for c in cart :
                try :
                    find = ItemOrder.objects.get(user=request.user,food=c.food,order=order)
                except:
                    ItemOrder.objects.create(user = request.user,food = c.food,order=order,quantity=c.quantity)
            main_data = Order.objects.filter(user=request.user,code=code)
            ser_data = OrderSerializer(instance=main_data,many=True)
            itemorderr = ItemOrder.objects.filter(user = request.user)
            itemorder = ItemOrderSerializer(instance = itemorderr,many=True)
            context = {
            'order': ser_data.data, 'itemorder':itemorder.data, 
            }
            return Response(context,status=200)
        else:
            return Response("error",status=400)    


    
            


        
    