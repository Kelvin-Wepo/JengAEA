from django.urls import path
from django.http import HttpResponse
from .views import (
    UserRegistrationView, UserLoginView, UserProfileView,
    send_otp, verify_otp, user_logout, user_dashboard, simple_register
)

urlpatterns = [
    path('test/', lambda request: HttpResponse("Test endpoint working"), name='test'),
    path('simple-register/', simple_register, name='simple_register'),
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('logout/', user_logout, name='user_logout'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('dashboard/', user_dashboard, name='user_dashboard'),
    path('send-otp/', send_otp, name='send_otp'),
    path('verify-otp/', verify_otp, name='verify_otp'),
]



