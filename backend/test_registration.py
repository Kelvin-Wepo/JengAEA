#!/usr/bin/env python
"""
Test script to check registration endpoint
"""
import os
import sys
import django
import json
from django.test import Client
from django.urls import reverse

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jengaest.settings')
    django.setup()
    
    client = Client()
    
    # Test registration data
    registration_data = {
        'username': 'testuser',
        'email': 'test@example.com',
        'phone_number': '+254700000000',
        'role': 'homeowner',
        'password': 'testpassword123',
        'password_confirm': 'testpassword123',
        'first_name': 'Test',
        'last_name': 'User',
        'location': 'Nairobi, Kenya',
        'company_name': ''
    }
    
    print("Testing registration endpoint...")
    print(f"Data: {json.dumps(registration_data, indent=2)}")
    
    response = client.post('/api/auth/register/', 
                          data=json.dumps(registration_data),
                          content_type='application/json')
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.content.decode()}")
    
    if response.status_code == 201:
        print("✅ Registration successful!")
    else:
        print("❌ Registration failed!")
        try:
            error_data = json.loads(response.content.decode())
            print(f"Error details: {json.dumps(error_data, indent=2)}")
        except:
            print(f"Raw error: {response.content.decode()}")



