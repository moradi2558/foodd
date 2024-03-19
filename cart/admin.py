from django.contrib import admin
from.models import*
# Register your models here.

class CartAdmin(admin.ModelAdmin):
    list_display = ['user','food','quantity']

class ItemInline(admin.TabularInline):
    '''Tabular Inlinew for '''
    model = ItemOrder
    readoly_fields = ['user','food','quantity','price']
    
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'user','email','f_name','l_name','address','create','paid','get_price','code'
    ]
    inlines = [ItemInline]
    


admin.site.register(Cart,CartAdmin)
admin.site.register(Order,OrderAdmin)
admin.site.register(ItemOrder)