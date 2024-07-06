from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import CustomUserViewSet
from clinic.views import PatientViewSet, AppointmentViewSet, PaymentViewSet
from clinic.views import EstablishmentViewSet, SpecialityViewSet, DentalServiceViewSet, SubCategoryServiceViewSet, DiagnosticViewSet, TreatmentViewSet, ConsumableViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'patients', PatientViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'establishments', EstablishmentViewSet)
router.register(r'specialities', SpecialityViewSet)
router.register(r'dental-services', DentalServiceViewSet)
router.register(r'sub-category-services', SubCategoryServiceViewSet)
router.register(r'diagnostics', DiagnosticViewSet)
router.register(r'treatments', TreatmentViewSet)
router.register(r'consumables', ConsumableViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
