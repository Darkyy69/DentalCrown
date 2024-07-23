from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role', 'phone_number', 'birth_date', 'address', 'gender')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role', 'phone_number', 'birth_date', 'address', 'gender')}),
    )

# admin.site.register(CustomUser)
admin.site.register(CustomUser, CustomUserAdmin)
