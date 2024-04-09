from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'account'

urlpatterns = [
   path('register/',views.UserRegisterView.as_view(),name='register'),
   path('login/',views.UserLoginView.as_view(),name='login'),
   path('logout/',views.UserLogoutView.as_view(),name='logout'),
   path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]