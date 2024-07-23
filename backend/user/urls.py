from django.urls import path
# from .views import CustomUserLogin, CustomUserRegister, CustomUserLogout 
from .views import CustomUserViewSet
urlpatterns = [
    # path('login/', CustomUserLogin.as_view(), name='api_login'),
    # path('logout/', CustomUserLogout.as_view(), name='api_logout'),
    # path('register/', CustomUserRegister.as_view(), name='api_register_user'),
    # path('user/', CustomUserView.as_view(), name='api_user')
]
