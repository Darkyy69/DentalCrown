from rest_framework import viewsets
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from .models import Establishment, Patient, Speciality, DentalService, SubCategoryService, Appointment, Treatment, Payment, Consumable, Diagnostic
from .serializers import AppointmentSerializer
from .serializers import PatientSerializer, AppointmentSerializer, PaymentSerializer, EstablishmentSerializer, SpecialitySerializer, DentalServiceSerializer, SubCategoryServiceSerializer, TreatmentSerializer, ConsumableSerializer, DiagnosticSerializer
from clinic.utils import broadcast_payment_popup, unicast_payment_popup, disable_receptionist_payment_popup
from notification.models import PaymentNotification, AppointmentNotification
from notification.tasks import check_payment_flag
from datetime import timedelta
import json
from rest_framework import status
from django.core.exceptions import ValidationError as DjangoValidationError

User = get_user_model()

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
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        status_dict = {
                'A': 'Active',
                'P': 'Pending',
                'D': 'Done',
                'M': 'Missed',
                'CP': 'Canceled by Patient',
                'CD': 'Canceled by Dentist',
                'R': 'Rescheduled'
            }
        instance = self.get_object()
        if 'status' in request.data and instance.status not in ['A', 'P']:
            return Response({'error': f"You cannot change the appointment from {status_dict[instance.status]} to {status_dict[request.data['status']]}"}, status=400)
        # Check if status is being updated to "D"
        if 'status' in request.data and request.data['status'] == 'D':
            # instance.perform_done_action()  # Replace with your actual method
            serializer = AppointmentSerializer(instance)
            appointment = serializer.data
            message = 'Appointment done for ' + appointment['patient']['last_name'] + ' ' + appointment['patient']['first_name']
            action = 'enable'
            target = 'payment-popup'
            # Create AppointmentNotification for all the receptionists and the dentist too
            for user in User.objects.filter(role='receptionist'):
                AppointmentNotification.objects.create(user=user, model_id=ContentType.objects.get_for_model(Appointment), row_id=appointment['id'])
            AppointmentNotification.objects.create(user = User.objects.get(id=appointment['dentist']['id']),model_id=ContentType.objects.get_for_model(Appointment), row_id=appointment['id'])
            # AppointmentNotification.objects.create(user = ,model_id=ContentType.objects.get_for_model(Appointment), row_id=appointment['id'])
            broadcast_payment_popup(request.user.id, json.dumps(message), action, target, appointment)
            # Set task_end_time to 30 minutes from now
            instance.task_end_time = timezone.now() + timedelta(minutes=30)
            instance.task_terminate_flag = False  # Reset the flag if necessary
            instance.save()
            print(instance.task_terminate_flag)

            # Start the Celery task
            check_payment_flag.apply_async((instance.id,))
            print((instance.id),)

        return super().partial_update(request, *args, **kwargs)

    
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

    # override the create method to add custom logic
    def create(self, request, *args, **kwargs):
        # Call the parent class create method
        try:
            # Call the parent class create method
            response = super().create(request, *args, **kwargs)
        except DjangoValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        # Add custom logic here
        # Get the current_user attribute from the request object
        current_user = request.user
        # If the current_user != the Model instance current_user, then throw an error (They might found a way to bypass the frontend)
        if not str(current_user.id) == str(response.data['current_user']):
            response.data['error'] = 'You are not allowed to perform this action'
            response.status_code = 403
            return response
        



        print(response.data.get('patient').get('id'),response.data.get('treatment').get('id'),response.data.get('dentist').get('id'))
        appointments = Appointment.objects.filter(
        patient=response.data.get('patient').get('id'),
        treatment=response.data.get('treatment').get('id'),
        dentist=response.data.get('dentist').get('id'),
        date__gte=timezone.now().date(),  # Assuming date is a date field
        status='D'
        )
        # print(appointments)
        # print(f'Dentist: {response.data.get('dentist').get('id')}, Patient: {response.data.get('patient').get('id')}')
        if appointments.exists():
            appointment = appointments.first()
            # print(appointment.id)
            # Set the flag in the appointment
            appointment.task_terminate_flag = True
            appointment.save()
            # print(appointment.task_terminate_flag)
            # Access the payment amount
            payment_amount = response.data.get('amount')
            print(f"Payment amount for the appointment: {payment_amount}")
        
            # Implement your post-payment logic here
            # Check who made the payment and create a notification for the other party
            patient = response.data['patient']
            dentist = response.data['dentist']
            dentist_id = dentist.get('id')
            message = f'{patient} has paid for this treatment.'
            target = 'payment-popup'
            action = 'disable'
            # Check if the current user is the patient or the dentist
            if str(current_user.id) == str(response.data.get('dentist').get('id')):
                # Create a notification for all receptionists
                for receptionist in User.objects.filter(role='receptionist'):
                    PaymentNotification.objects.create(user=receptionist, model_id=ContentType.objects.get_for_model(Payment), row_id=response.data.get('id'))
                disable_receptionist_payment_popup(json.dumps(message), action, target)

            dentist_obj = User.objects.get(id=response.data.get('dentist').get('id'))
            PaymentNotification.objects.create(user=dentist_obj,model_id=ContentType.objects.get_for_model(Payment), row_id=response.data.get('id'))

            if current_user.role == 'receptionist': # receptionist
                # Send WebSocket notification to the Payement dentist Attribute
                unicast_payment_popup(dentist_id,json.dumps(message), action, target)
            return response
    
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

    @action(detail=False, methods=['get'], url_path='patient/(?P<patient_id>[^/.]+)')
    def patient_treatments(self, request, patient_id=None):
        treatments = Treatment.objects.filter(patient_id=patient_id)
        serializer = self.get_serializer(treatments, many=True)
        return Response(serializer.data)
    
class ConsumableViewSet(viewsets.ModelViewSet):
    queryset = Consumable.objects.all()
    serializer_class = ConsumableSerializer

class DiagnosticViewSet(viewsets.ModelViewSet):
    queryset = Diagnostic.objects.all()
    serializer_class = DiagnosticSerializer