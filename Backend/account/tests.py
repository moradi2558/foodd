from django.test import TestCase,Client
import unittest
from django.urls import reverse
from model_bakery import baker
from.models import *
from account.models import User
# Create your tests here.


class TestUser(TestCase):
    
    def test_register_POST(self):
        response = self.client.post(reverse('account:register'),data = {
            'username':'mane','email':'mane@gmail.com','password':'mane2000','password2':'mane2000'
        })
        self.assertEqual(response.status_code,201)

    def test_login_POST(self):
        response = self.client.post(reverse('account:login'),data = {
            'username':'mane','email':'mane@gmail.com','password':'mane2000',
        })
        self.assertEqual(response.status_code,200)