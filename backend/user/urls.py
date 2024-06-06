from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.CustomLogin.as_view(), name='api_login'),
    # path('logout/', logout_view, name='api_logout'),
    # path('register/', UserRegistrationView.as_view(), name='api_register_user'),
]
