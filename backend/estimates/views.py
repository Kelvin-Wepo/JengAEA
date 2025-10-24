from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Sum
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta
import uuid

from .models import Estimate, EstimateItem, EstimateRevision, EstimateShare
from .serializers import (
    EstimateSerializer, EstimateCreateSerializer, EstimateUpdateSerializer,
    EstimateSummarySerializer, EstimateItemSerializer, EstimateRevisionSerializer,
    EstimateShareSerializer, CostCalculationSerializer
)
from projects.models import ProjectType, Location


class EstimateListView(generics.ListCreateAPIView):
    """List and create estimates"""
    
    serializer_class = EstimateSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project_type', 'location', 'status']
    search_fields = ['project_name', 'project_description']
    ordering_fields = ['created_at', 'total_estimated_cost']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Estimate.objects.all()
        return Estimate.objects.filter(user=user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EstimateCreateSerializer
        return EstimateSerializer


class EstimateDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update, or delete an estimate"""
    
    serializer_class = EstimateSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Estimate.objects.all()
        return Estimate.objects.filter(user=user)
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return EstimateUpdateSerializer
        return EstimateSerializer
    
    def perform_update(self, serializer):
        instance = serializer.instance
        old_total = instance.total_estimated_cost
        
        # Save the updated estimate
        estimate = serializer.save()
        
        # Create revision if total cost changed
        if estimate.total_estimated_cost != old_total:
            revision_number = EstimateRevision.objects.filter(
                estimate=estimate
            ).count() + 1
            
            EstimateRevision.objects.create(
                estimate=estimate,
                revision_number=revision_number,
                changes_summary=f"Updated estimate - Total cost changed from ${old_total} to ${estimate.total_estimated_cost}",
                previous_total_cost=old_total,
                new_total_cost=estimate.total_estimated_cost,
                created_by=self.request.user
            )


class EstimateSummaryListView(generics.ListAPIView):
    """List estimates with summary information"""
    
    serializer_class = EstimateSummarySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project_type', 'location', 'status']
    search_fields = ['project_name']
    ordering_fields = ['created_at', 'total_estimated_cost']
    ordering = ['-created_at']
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Estimate.objects.all()
        return Estimate.objects.filter(user=user)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def calculate_cost(request):
    """Calculate project cost based on parameters"""
    
    serializer = CostCalculationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        project_type = get_object_or_404(ProjectType, id=serializer.validated_data['project_type_id'])
        location = get_object_or_404(Location, id=serializer.validated_data['location_id'])
        total_area = serializer.validated_data['total_area']
        contingency_percentage = serializer.validated_data.get('contingency_percentage', 10.00)
        custom_items = serializer.validated_data.get('custom_items', [])
        
        # Calculate base cost
        base_cost_per_sqm = project_type.base_cost_per_sqm
        adjusted_cost_per_sqm = base_cost_per_sqm * location.cost_multiplier
        total_estimated_cost = adjusted_cost_per_sqm * total_area
        
        # Calculate contingency
        contingency_amount = (total_estimated_cost * contingency_percentage) / 100
        
        # Calculate custom items total
        custom_items_total = 0
        if custom_items:
            for item in custom_items:
                custom_items_total += item['quantity'] * item['unit_price']
        
        # Final total
        final_total = total_estimated_cost + contingency_amount + custom_items_total
        
        return Response({
            'project_type': {
                'id': project_type.id,
                'name': project_type.name,
                'base_cost_per_sqm': base_cost_per_sqm
            },
            'location': {
                'id': location.id,
                'name': location.name,
                'cost_multiplier': location.cost_multiplier
            },
            'calculations': {
                'total_area': total_area,
                'base_cost_per_sqm': base_cost_per_sqm,
                'adjusted_cost_per_sqm': adjusted_cost_per_sqm,
                'base_total_cost': total_estimated_cost,
                'contingency_percentage': contingency_percentage,
                'contingency_amount': contingency_amount,
                'custom_items_total': custom_items_total,
                'final_total_cost': final_total
            },
            'breakdown': {
                'materials': total_estimated_cost * 0.60,  # 60% materials
                'labor': total_estimated_cost * 0.30,      # 30% labor
                'equipment': total_estimated_cost * 0.10,  # 10% equipment
                'contingency': contingency_amount,
                'custom_items': custom_items_total
            }
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_estimate(request):
    """Save calculated estimate"""
    
    serializer = EstimateCreateSerializer(data=request.data)
    if serializer.is_valid():
        estimate = serializer.save(user=request.user)
        return Response(
            EstimateSerializer(estimate).data,
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def duplicate_estimate(request, estimate_id):
    """Duplicate an existing estimate"""
    
    try:
        original_estimate = get_object_or_404(Estimate, id=estimate_id, user=request.user)
        
        # Create new estimate
        new_estimate = Estimate.objects.create(
            user=request.user,
            project_type=original_estimate.project_type,
            location=original_estimate.location,
            project_template=original_estimate.project_template,
            project_name=f"{original_estimate.project_name} (Copy)",
            project_description=original_estimate.project_description,
            total_area=original_estimate.total_area,
            base_cost_per_sqm=original_estimate.base_cost_per_sqm,
            location_multiplier=original_estimate.location_multiplier,
            contingency_percentage=original_estimate.contingency_percentage
        )
        
        # Copy items
        for item in original_estimate.items.all():
            EstimateItem.objects.create(
                estimate=new_estimate,
                category=item.category,
                name=item.name,
                description=item.description,
                quantity=item.quantity,
                unit=item.unit,
                unit_price=item.unit_price,
                notes=item.notes
            )
        
        return Response(
            EstimateSerializer(new_estimate).data,
            status=status.HTTP_201_CREATED
        )
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def share_estimate(request, estimate_id):
    """Share an estimate with someone via email"""
    
    try:
        estimate = get_object_or_404(Estimate, id=estimate_id, user=request.user)
        
        shared_with_email = request.data.get('email')
        shared_with_name = request.data.get('name', '')
        expires_days = request.data.get('expires_days', 30)
        
        if not shared_with_email:
            return Response(
                {'error': 'Email is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Generate access token
        access_token = str(uuid.uuid4())
        expires_at = timezone.now() + timedelta(days=expires_days)
        
        # Create share record
        share = EstimateShare.objects.create(
            estimate=estimate,
            shared_with_email=shared_with_email,
            shared_with_name=shared_with_name,
            access_token=access_token,
            expires_at=expires_at,
            created_by=request.user
        )
        
        # TODO: Send email with share link
        # For now, return the access token
        
        return Response({
            'message': 'Estimate shared successfully',
            'share_token': access_token,
            'expires_at': expires_at,
            'share_url': f"/shared-estimate/{access_token}"
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([])  # No authentication required for shared estimates
def shared_estimate(request, access_token):
    """Access a shared estimate"""
    
    try:
        share = get_object_or_404(
            EstimateShare, 
            access_token=access_token, 
            is_active=True
        )
        
        # Check if share has expired
        if timezone.now() > share.expires_at:
            return Response(
                {'error': 'This shared estimate has expired'}, 
                status=status.HTTP_410_GONE
            )
        
        return Response(
            EstimateSerializer(share.estimate).data
        )
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def estimate_statistics(request):
    """Get user's estimate statistics"""
    
    user = request.user
    estimates = Estimate.objects.filter(user=user)
    
    stats = {
        'total_estimates': estimates.count(),
        'total_value': estimates.aggregate(Sum('total_estimated_cost'))['total_estimated_cost__sum'] or 0,
        'average_cost': estimates.aggregate(Sum('total_estimated_cost'))['total_estimated_cost__sum'] / estimates.count() if estimates.count() > 0 else 0,
        'by_status': {
            'draft': estimates.filter(status='draft').count(),
            'pending': estimates.filter(status='pending').count(),
            'approved': estimates.filter(status='approved').count(),
            'rejected': estimates.filter(status='rejected').count(),
        },
        'by_project_type': {}
    }
    
    # Group by project type
    for estimate in estimates:
        project_type = estimate.project_type.name
        if project_type not in stats['by_project_type']:
            stats['by_project_type'][project_type] = 0
        stats['by_project_type'][project_type] += 1
    
    return Response(stats)



