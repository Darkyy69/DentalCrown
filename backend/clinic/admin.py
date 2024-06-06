from django.contrib import admin
from .models import Patient, Appointment, MedicalRecord, Payment

admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(MedicalRecord)
admin.site.register(Payment)
