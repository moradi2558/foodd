from rest_framework import serializers
from . models import *

class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(required=True,write_only=True)
    class Meta:
        model = User
        fields = ['username','email','password','password2']
        def validate(self,data):
            if data[password] != data[password2]:
                raise serializers.ValidationError('passwords are not the same...')
            return data
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 250,required = True)
    password = serializers.CharField(required = True)
    
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    