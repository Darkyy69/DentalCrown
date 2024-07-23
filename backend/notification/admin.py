from django.contrib import admin

from .models import PaymentNotification, AppointmentNotification
# Register your models here.

admin.site.register(PaymentNotification)
admin.site.register(AppointmentNotification)