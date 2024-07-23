from rest_framework import serializers
from django.contrib.auth import get_user_model
UserModel = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        # fields = ["id", "username", "password"]
        exclude = ['password', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'last_login', 'groups', 'user_permissions']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user

    def get_full_name(self, obj):
        # Split last name to capitalize only the first part
        first_name_parts = obj.first_name.split()
        capitalized_first_name = ' '.join([part.capitalize() for part in first_name_parts])
        user_role = obj.role
        # Format full name
        if user_role == 'dentist' or user_role == 'admin':
            return f"Dr. {obj.last_name.upper()} {capitalized_first_name}"
        return f"{obj.last_name.upper()} {capitalized_first_name}"

# class CustomUserSerializer(serializers.ModelSerializer):
#     full_name = serializers.SerializerMethodField()

#     class Meta:
#         model = UserModel
#         exclude = ['password', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'last_login', 'groups', 'user_permissions']

#     def get_full_name(self, obj):
#         # Split last name to capitalize only the first part
#         first_name_parts = obj.first_name.split()
#         capitalized_first_name = ' '.join([part.capitalize() for part in first_name_parts])
#         user_role = obj.role
#         # Format full name
#         if user_role == 'dentist' or user_role == 'admin':
#             return f"Dr. {obj.last_name.upper()} {capitalized_first_name}"
#         return f"{obj.last_name.upper()} {capitalized_first_name}"
