import re
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()

def custom_validation(data):

    validate_email(data)
    validate_username(data)
    validate_password(data)
    validate_role(data)

    return data

def validate_email(data):
    email = data.get('email').strip()
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    
    if not email:
        raise ValidationError("Email is required")
    
    if not re.match(email_regex, email):
        raise ValidationError("Enter a valid email address")
    
    if UserModel.objects.filter(email=email).exists():
        raise ValidationError("Choose another email")
    
    return True

def validate_password(data):
    password = data.get('password').strip()
    password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'

    if not password:
        raise ValidationError("Password is required")
    
    if not re.match(password_regex, password):
        raise ValidationError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    
    return True

def validate_username(data):
    username = data.get('username').strip()
    username_regex = r'^[a-zA-Z_][a-zA-Z0-9_]{2,29}$'  # 3-30 characters, starts with a letter or underscore

    if not username:
        raise ValidationError("Username is required")
    
    if not re.match(username_regex, username):
        raise ValidationError("Username must be 3-30 characters long and must start with a letter or an underscore. It can only contain letters, numbers, and underscores.")
    
    if UserModel.objects.filter(username=username).exists():
        raise ValidationError("Choose another username")

def validate_role(data):
    role = data.get('role').strip()
    if not role:
        raise ValidationError("Role is required")
    else:
        if role not in ['receptionist', 'dentist']:
            raise ValidationError("you can only create a receptionist or a dentist account")
    
        return True