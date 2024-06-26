from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm,UserCreationForm
from .models import User

# Register your models here.
class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    list_display = ('email','is_admin')
    list_filter = ('is_admin',)
    
    fieldsets = (('main',{
                      'fields':(
                          'email','username','password'
                          ),
                        }),
                 (
                     'premissions',{
                        'fields':(
                            'is_admin','is_active','last_login'
                            ),
                        }),
                 )
    add_fieldsets = (
        ('main', {
            "fields": (
                'username','email','password1','password2'
            ),
        }),
    )
    
    search_fields = ('email','username')
    ordering = ['username']
    filter_horizontal = ()
    
admin.site.unregister(Group)
admin.site.register(User,UserAdmin)
admin.site.register(Group)