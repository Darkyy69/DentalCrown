from django.urls import path
from .views import CustomUserLogin, CustomUserRegister, CustomUserView, CustomUserLogout

urlpatterns = [
    path('login/', CustomUserLogin.as_view(), name='api_login'),
    path('logout/', CustomUserLogout.as_view(), name='api_logout'),
    path('register/', CustomUserRegister.as_view(), name='api_register_user'),
    path('user/', CustomUserView.as_view(), name='api_user')
]
