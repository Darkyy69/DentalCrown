from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()

def custom_validation(data):
    email = data.get('email').strip()
    username = data.get('username').strip()
    password = data.get('password').strip()

    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError("Choose another email")
    
    if not password or len(password)<=5:
        raise ValidationError("Password must be at least 5 characters")

    if not username or UserModel.objects.filter(username=username).exists():
        raise ValidationError("Choose another username")
    
    return data

def validate_email(data):
    email = data.get('email').strip()
    if not email:
        raise ValidationError("Email is required")
    return True

def validate_password(data):
    password = data.get('password').strip()
    if not password:
        raise ValidationError("Password is required")
    return True

def validate_username(data):
    username = data.get('username').strip()
    if not username:
        raise ValidationError("Username is required")
    return True


