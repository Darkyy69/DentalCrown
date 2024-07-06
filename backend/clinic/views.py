from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

from rest_framework import viewsets
from .models import Establishment, Patient, Speciality, DentalService, SubCategoryService, Appointment, Treatment, Payment, Consumable, Diagnostic
from .serializers import PatientSerializer, AppointmentSerializer, PaymentSerializer, EstablishmentSerializer, SpecialitySerializer, DentalServiceSerializer, SubCategoryServiceSerializer, TreatmentSerializer, ConsumableSerializer, DiagnosticSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_queryset(self):
        qs = Patient.objects.all()
        # query can be ?search and the search can be either first_name or last_name or phone_number
        search = self.request.query_params.get('search', None)
        if search is not None:
            qs = qs.filter(first_name__icontains=search) | qs.filter(last_name__icontains=search) | qs.filter(phone_number__icontains=search)
        return qs

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    # Custom action to list today's appointments
    @action(detail=False, methods=['get'])
    def today(self, request):
        today = timezone.now().date()
        appointments = self.queryset.filter(date=today)
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)

    # Custom action to list tomorrow's appointments
    @action(detail=False, methods=['get'])
    def tomorrow(self, request):
        tomorrow = timezone.now().date() + timedelta(days=1)
        appointments = self.queryset.filter(date=tomorrow)
        serializer = self.get_serializer(appointments, many=True)
        return Response(serializer.data)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
class EstablishmentViewSet(viewsets.ModelViewSet):
    queryset = Establishment.objects.all()
    serializer_class = EstablishmentSerializer

class SpecialityViewSet(viewsets.ModelViewSet):
    queryset = Speciality.objects.all()
    serializer_class = SpecialitySerializer

class DentalServiceViewSet(viewsets.ModelViewSet):
    queryset = DentalService.objects.all()
    serializer_class = DentalServiceSerializer

class SubCategoryServiceViewSet(viewsets.ModelViewSet):
    queryset = SubCategoryService.objects.all()
    serializer_class = SubCategoryServiceSerializer

class TreatmentViewSet(viewsets.ModelViewSet):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer

class ConsumableViewSet(viewsets.ModelViewSet):
    queryset = Consumable.objects.all()
    serializer_class = ConsumableSerializer

class DiagnosticViewSet(viewsets.ModelViewSet):
    queryset = Diagnostic.objects.all()
    serializer_class = DiagnosticSerializer