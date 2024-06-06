from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer

from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication
import json
# from rest_framework import generics
# from rest_framework.permissions import IsAdminUser



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer




# @csrf_exempt
class CustomLogin(APIView):

    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
           
            data = (request.data)
        
            
            username = data.get('username')
      
            password = data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful', 'csrfToken': get_token(request)}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'}, status=200)

class UserRegistrationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Check if the user making the request is an admin or receptionist
        if request.user.role not in ['admin', 'receptionist']:
            return Response({'error': 'You do not have permission to create a new user.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = CustomUserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
