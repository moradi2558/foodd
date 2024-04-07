from django.contrib.auth             import login, logout, authenticate
from django.shortcuts                import get_object_or_404
from rest_framework.views            import APIView
from rest_framework.permissions      import IsAuthenticated
from rest_framework.response         import Response
from rest_framework                  import viewsets,status
from . serializers                   import *
from . models                        import User
from rest_framework_simplejwt.tokens import RefreshToken
from cart.models                     import *
from cart.serializers                import *
# Create your views here.


class UserRegisterView(APIView):
    
    def post(self,request):
        ser_data = UserRegisterSerializer(data = request.POST)
        if ser_data.is_valid():
            data = ser_data.validated_data
            User.objects.create_user(username = data['username'],email = data['email'],password = data['password'])
            user = authenticate(request,username = data['username'],password = data['password'])
            login(request,user)
            user = User.objects.filter(id=user.id)
            user_info = UserInfoSerializer(instance = user,many=True)
            cart_info = Cart.objects.filter(user=request.user)
            cart = CartSerializer(instance=cart_info,many=true)
            context = {
                'user':user_info.data,
                'cart':cart.data,
            }    
            return Response(context,status = 201)
        else:
            return Response(ser_data.errors,status = 400)
        



class UserLoginView(APIView):
    def post(self,request):
        ser_data = UserLoginSerializer(data = request.POST)
        if ser_data.is_valid():
            data = ser_data.validated_data
            try:
                user = authenticate(request,username = User.objects.get(email = data['username']),password = data['password'])
            except:
                user = authenticate(request,username = data['username'],password = data['password'])
            if user is not None:
                login(request,user)
                user = User.objects.filter(id=user.id)
                user_info = UserInfoSerializer(instance=user,many=True)
                cart_info = Cart.objects.filter(user=request.user)
                cart = CartSerializer(instance=cart_info,many=True)
                context = {
                    'user':user_info.data,
                    'cart':cart.data,
                }       
                return Response(context,status = 201)
            elif not User.objects.filter(username = username).exists():
                return Response({'this username not exists'})
            else:
                return Response({'username is not match with password'})
        
    
    
class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        logout(request)
        return Response({'logged out....'})
