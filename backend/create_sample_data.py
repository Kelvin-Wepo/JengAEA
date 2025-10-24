#!/usr/bin/env python
"""
Script to create sample data for the application
"""
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jengaest.settings')
    django.setup()
    
    from projects.models import ProjectType, Location, MaterialCategory, LaborCategory
    from subscriptions.models import SubscriptionPlan
    
    print("Creating sample data...")
    
    # Create sample project types
    project_types = [
        {
            'name': '2-Bedroom House',
            'category': 'residential',
            'description': 'Standard 2-bedroom residential house',
            'base_cost_per_sqm': 150.00
        },
        {
            'name': '3-Bedroom House',
            'category': 'residential', 
            'description': 'Standard 3-bedroom residential house',
            'base_cost_per_sqm': 180.00
        },
        {
            'name': 'Commercial Building',
            'category': 'commercial',
            'description': 'Multi-story commercial building',
            'base_cost_per_sqm': 250.00
        },
        {
            'name': 'Perimeter Wall',
            'category': 'infrastructure',
            'description': 'Standard perimeter wall construction',
            'base_cost_per_sqm': 80.00
        }
    ]
    
    for pt_data in project_types:
        project_type, created = ProjectType.objects.get_or_create(
            name=pt_data['name'],
            defaults=pt_data
        )
        if created:
            print(f"Created project type: {project_type.name}")
    
    # Create sample locations
    locations = [
        {
            'name': 'Nairobi Central',
            'country': 'KE',
            'region': 'Nairobi',
            'city': 'Nairobi',
            'cost_multiplier': 1.20
        },
        {
            'name': 'Kampala Central',
            'country': 'UG',
            'region': 'Central',
            'city': 'Kampala', 
            'cost_multiplier': 0.95
        },
        {
            'name': 'Dar es Salaam',
            'country': 'TZ',
            'region': 'Dar es Salaam',
            'city': 'Dar es Salaam',
            'cost_multiplier': 1.10
        }
    ]
    
    for loc_data in locations:
        location, created = Location.objects.get_or_create(
            name=loc_data['name'],
            defaults=loc_data
        )
        if created:
            print(f"Created location: {location.name}")
    
    # Create subscription plans
    plans = [
        {
            'name': 'Free Trial',
            'plan_type': 'free',
            'description': 'Perfect for trying out our platform',
            'price': 0.00,
            'duration_months': None,
            'estimates_limit': 5,
            'features': ['Basic project types', 'PDF reports', 'Email support']
        },
        {
            'name': 'Professional',
            'plan_type': '6months',
            'description': 'Ideal for contractors and small teams',
            'price': 49.00,
            'duration_months': 6,
            'estimates_limit': 100,
            'features': ['All project types', 'PDF & Excel reports', 'Priority support']
        },
        {
            'name': 'Enterprise',
            'plan_type': '12months',
            'description': 'For large construction companies',
            'price': 89.00,
            'duration_months': 12,
            'estimates_limit': None,  # Unlimited
            'features': ['Everything in Professional', 'Team collaboration', 'API access']
        }
    ]
    
    for plan_data in plans:
        plan, created = SubscriptionPlan.objects.get_or_create(
            name=plan_data['name'],
            defaults=plan_data
        )
        if created:
            print(f"Created subscription plan: {plan.name}")
    
    print("Sample data creation complete!")



