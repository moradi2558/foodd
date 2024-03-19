from django.db import models
from account.models import*
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50,unique=True,null=True,blank=True,allow_unicode=True)
    create = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='Media/category')
    
    def __str__(self):
        return self.name
    
class Food(models.Model):
    category = models.ManyToManyField(Category,blank=True)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50,unique=True,null=True,blank=True,allow_unicode=True)
    desc = models.TextField(max_length=2500)
    price = models.PositiveIntegerField(default=0)
    discount = models.PositiveIntegerField(default=0)
    create = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='Media/category/food')
    
    def __str__(self):
        return self.name
    