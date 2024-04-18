from django.contrib import admin
from.models import*
# Register your models here.

class CartAdmin(admin.ModelAdmin):
    list_display = ['user','food','quantity']


    
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'user','email','f_name','l_name','address','create','paid','code',
    ]
    
class ItemOrderAdmin(admin.ModelAdmin):
    list_display = [
        'user','food','order','quantity'
        ]
    

admin.site.register(ItemOrder,ItemOrderAdmin)
admin.site.register(Cart,CartAdmin)
admin.site.register(Order,OrderAdmin)
