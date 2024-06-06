from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserRegistrationSerializer, CustomUserLoginSerializer, CustomUserSerializer

from django.contrib.auth import login, logout
# from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.authentication import SessionAuthentication
from .validation import custom_validation

# from rest_framework import generics
# from rest_framework.permissions import IsAdminUser



class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer




# # @csrf_exempt
# class CustomLogin(APIView):

#     permission_classes = [permissions.AllowAny]
#     authentication_classes = [SessionAuthentication]

#     def post(self, request):
           
#             data = (request.data)
        
            
#             username = data.get('username')
      
#             password = data.get('password')
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 login(request, user)
#                 return JsonResponse({'message': 'Login successful', 'csrfToken': get_token(request)}, status=status.HTTP_200_OK)
#             else:
#                 return JsonResponse({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


# @csrf_exempt
# @api_view(['POST'])
# def logout_view(request):
#     logout(request)
#     return JsonResponse({'message': 'Logout successful'}, status=200)

# class UserRegistrationView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def post(self, request, *args, **kwargs):
#         # Check if the user making the request is an admin or receptionist
#         if request.user.role not in ['admin', 'receptionist']:
#             return Response({'error': 'You do not have permission to create a new user.'}, status=status.HTTP_403_FORBIDDEN)

#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserView(APIView):
# 	permission_classes = (permissions.IsAuthenticated,)
# 	authentication_classes = (SessionAuthentication,)
# 	##
# 	def get(self, request):
# 		serializer = CustomUserSerializer(request.user)
# 		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class CustomUserRegister(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Check if the user making the request has the 'admin' or 'receptionist' role
        if request.user.role not in ['admin', 'receptionist']:
            return Response({'error': 'You do not have permission to create a new user.'}, status=status.HTTP_403_FORBIDDEN)
        
        # Validate and clean the data
        clean_data = custom_validation(request.data)
        
        # Serialize the data
        serializer = CustomUserRegistrationSerializer(data=clean_data)
        
        # Check if the serialized data is valid
        if serializer.is_valid(raise_exception=True):
            # Create the user
            user = serializer.create(clean_data)
            if user:
                # Return the serialized data and a success status
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Return a bad request status if the data is not valid
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CustomUserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        data = request.data
        # assert validate_username(data)
        # assert validate_password(data)
        serializer = CustomUserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class CustomUserLogout(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    
class CustomUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        if request.user:
            serializer  = CustomUserSerializer(request.user)
            return Response({'user': serializer.data}, status=status.HTTP_200_OK)
        
        return Response({'error': 'You are not authenticated yet'}, status=status.HTTP_403_FORBIDDEN)

