from django.contrib import admin
from .models import Establishment, Patient, Speciality, SubCategoryService, DentalService, Appointment, Payment, Treatment, Consumable, Diagnostic

admin.site.register(Establishment)
admin.site.register(Patient)
admin.site.register(Speciality)
admin.site.register(SubCategoryService)
admin.site.register(DentalService)
admin.site.register(Appointment)
admin.site.register(Payment)
admin.site.register(Treatment)
admin.site.register(Consumable)
admin.site.register(Diagnostic)