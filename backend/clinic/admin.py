from django.contrib import admin
from .models import Establishment, Patient, Appointment, Payment, Treatement, Consumable

admin.site.register(Establishment)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Payment)
admin.site.register(Treatement)
admin.site.register(Consumable)
