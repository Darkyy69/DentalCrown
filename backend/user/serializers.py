from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from rest_framework.exceptions import ValidationError

# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone_number', 'birth_date', 'address']

UserModel = get_user_model()

class CustomUserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    
    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(email=validated_data['email'], password=validated_data['password'],
                                                  username = validated_data['username'], role=validated_data['role'])
        user_obj.username = validated_data['username']
        user_obj.save()
        return user_obj
    
class CustomUserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def check_user(self, validated_data):
        user = authenticate(username=validated_data['username'], password=validated_data['password'])
        if not user:
            raise ValidationError('User not found')
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        exclude = ['password', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'last_login', 'groups', 'user_permissions']

    def get_full_name(self, obj):
        # Split last name to capitalize only the first part
        first_name_parts = obj.first_name.split()
        capitalized_first_name = ' '.join([part.capitalize() for part in first_name_parts])

        # Format full name
        return f"Dr. {obj.last_name.upper()} {capitalized_first_name}"
