from django.contrib import admin
from .models import *
# Register your models here.

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name','slug','create')
    list_filter = ('create',)
    prepopulated_fields = {'slug':('name',)}

class FoodAdmin(admin.ModelAdmin):
    list_display = ('name','price','discount','create')
    list_filter = ('create','category',)
    raw_id_fields = ('category',)
    prepopulated_fields = {'slug':('name',)}
    
    

admin.site.register(Category,CategoryAdmin)
admin.site.register(Food,FoodAdmin)