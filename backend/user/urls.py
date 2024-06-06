from django.urls import path
from .views import login_view, logout_view, UserRegistrationView

urlpatterns = [
    path('login/', login_view, name='api_login'),
    path('logout/', logout_view, name='api_logout'),
    path('register/', UserRegistrationView.as_view(), name='api_register_user'),
]
