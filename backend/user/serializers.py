from rest_framework import serializers
from .models import CustomUser

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'birth_date', 'address']

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'birth_date', 'address']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data['role'],
            phone_number=validated_data.get('phone_number', ''),
            birth_date=validated_data.get('birth_date', None),
            address=validated_data.get('address', '')
        )
        return user
