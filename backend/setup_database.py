#!/usr/bin/env python
"""
Script to set up the database properly
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jengaest.settings')
    django.setup()
    
    print("Creating migrations for all apps...")
    
    # Create migrations for all apps
    apps = ['accounts', 'projects', 'estimates', 'subscriptions', 'reports']
    
    for app in apps:
        try:
            print(f"Creating migrations for {app}...")
            execute_from_command_line(['manage.py', 'makemigrations', app])
        except Exception as e:
            print(f"Error creating migrations for {app}: {e}")
    
    print("Running migrations...")
    execute_from_command_line(['manage.py', 'migrate'])
    
    print("Database setup complete!")



