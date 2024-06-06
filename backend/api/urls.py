from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import CustomUserViewSet
from clinic.views import PatientViewSet, AppointmentViewSet, MedicalRecordViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medicalrecords', MedicalRecordViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
