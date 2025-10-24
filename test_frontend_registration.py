#!/usr/bin/env python
"""
Test script to simulate frontend registration request
"""
import requests
import json

# Test registration data that frontend would send
registration_data = {
    'username': 'testuser2',
    'email': 'test2@example.com',
    'phone_number': '+254700000001',
    'role': 'homeowner',
    'password': 'testpassword123',
    'password_confirm': 'testpassword123',
    'first_name': 'Test',
    'last_name': 'User',
    'location': 'Nairobi, Kenya',
    'company_name': ''
}

print("Testing frontend registration...")
print(f"Data: {json.dumps(registration_data, indent=2)}")

try:
    response = requests.post(
        'http://127.0.0.1:8000/api/auth/register/',
        json=registration_data,
        headers={'Content-Type': 'application/json'}
    )
    
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 201:
        print("✅ Registration successful!")
    else:
        print("❌ Registration failed!")
        
except requests.exceptions.ConnectionError:
    print("❌ Could not connect to Django server. Make sure it's running on http://127.0.0.1:8000")
except Exception as e:
    print(f"❌ Error: {e}")



