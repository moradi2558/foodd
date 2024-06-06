from django.test import TestCase,Client
import unittest
from django.urls import reverse
from model_bakery import baker
from.models import *
from account.models import User
import pytest 

# Create your tests here.

# class TestUserOrder_Post(TestCase):
#     def setup(self):
#         user = baker.make(User)
#         User.objects.create_user(user)
#         self.client=Client()
#         self.client.login(user)

#     @pytest.mark.django_db
#     def test_OrderView_GET(self):
#         response = self.client.get("http://cart/cart/1/")
#         self.assertEqual(response.status_code,200)
    
#     @pytest.mark.django_db
#     def test_OrderView_POST(self):
#         data = baker.make(Cart)
#         response = self.client.post("http://cart/cart/1/",data=data)
#         self.assertEqual(response.status_code,200)

