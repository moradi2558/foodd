from django.db import models
from home.models import*
from django.forms import ModelForm
# Create your models here.

class Cart(models.Model):
    food = models.ForeignKey(Food,on_delete = models.CASCADE)
    user = models.ForeignKey(User,on_delete = models.CASCADE)
    quantity = models.PositiveIntegerField()
    
    def __str__(self):
        return self.user.username
    
class Order(models.Model):
    user = models.ForeignKey(User,on_delete = models.CASCADE)
    food = models.ForeignKey(Food,on_delete = models.CASCADE)
    quantity = models.IntegerField()
    create = models.DateTimeField(auto_now_add =True)
    paid = models.BooleanField(default = False)
    code = models.CharField(max_length = 200,null = True)
    email = models.EmailField()
    f_name = models.CharField(max_length=300) 
    l_name = models.CharField(max_length=300) 
    address = models.CharField(max_length=1000)  
    
    def __str__(self):
        return self.user.username
    