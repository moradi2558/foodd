from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError
from django import forms
from .models  import User

#Forms
class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='password1',widget=forms.PasswordInput)
    password2 = forms.CharField(label='password2',widget=forms.PasswordInput)
    
    class Meta:
        model = User 
        fields = ('username','email')
        
        def clean_password2(self):
            cd = cleaned_data
            if cd['password1'] and cd['password2'] != cd['password']:
                raise ValueError('passwords is not the same.')
            if len(cd['password1']) < 8 :
                raise ValueError('The password is too short.')
            return cd['password2']
        
        def clean_email(self):
            email = self.cleaned_data['email']
            if User.objects.filter(email=email).exists():
                raise forms.ValidationError('این ایمیل از قبل وجود دارد')
            return email
        
        def save(self,commit=True):
            user = super().save(commit=False)
            user.set_password(self.cleaned_data['password1'])
            
            if commit:
                user.save()
            return user
        
class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(help_text="<a href=\"../password/\">...")
    class Meta:
        model = User 
        fields = ('username','email','password','last_login')