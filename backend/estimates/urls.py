from django.urls import path
from .views import (
    EstimateListView, EstimateDetailView, EstimateSummaryListView,
    calculate_cost, save_estimate, duplicate_estimate, share_estimate,
    shared_estimate, estimate_statistics
)

urlpatterns = [
    # Estimate CRUD
    path('', EstimateListView.as_view(), name='estimate_list'),
    path('summaries/', EstimateSummaryListView.as_view(), name='estimate_summaries'),
    path('<int:pk>/', EstimateDetailView.as_view(), name='estimate_detail'),
    
    # Estimate operations
    path('calculate/', calculate_cost, name='calculate_cost'),
    path('save/', save_estimate, name='save_estimate'),
    path('<int:estimate_id>/duplicate/', duplicate_estimate, name='duplicate_estimate'),
    path('<int:estimate_id>/share/', share_estimate, name='share_estimate'),
    
    # Shared estimates
    path('shared/<str:access_token>/', shared_estimate, name='shared_estimate'),
    
    # Statistics
    path('statistics/', estimate_statistics, name='estimate_statistics'),
]



