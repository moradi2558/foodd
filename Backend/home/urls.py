from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('',views.HomeView.as_view(),name ='home'),
    path('food/<int:category_id>',views.FoodView.as_view(),name ='food'),
]