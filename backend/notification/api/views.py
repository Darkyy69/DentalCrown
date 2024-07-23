from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import PaymentNotification, AppointmentNotification
from .serializers import PaymentNotificationSerializer,AppointmentNotificationSerializer
from clinic.serializers import PaymentSerializer, AppointmentSerializer
from rest_framework.permissions import IsAuthenticated

class NotificationsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset_payment = PaymentNotification.objects.filter(user=request.user)
        queryset_appointment = AppointmentNotification.objects.filter(user=request.user)
        
        serializer_payment = PaymentNotificationSerializer(queryset_payment, many=True)
        serializer_appointment = AppointmentNotificationSerializer(queryset_appointment, many=True)
        
        combined_data = {
            'payments': serializer_payment.data,
            'appointments': serializer_appointment.data
        }
        
        return Response(combined_data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get', 'post'], url_path='payment(/(?P<pk>[^/.]+))?')
    def handle_payment(self, request, pk=None):
        if request.method == 'GET':
            if pk:
                try:
                    payment = PaymentNotification.objects.get(pk=pk, user=request.user)
                    serializer = PaymentNotificationSerializer(payment)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except PaymentNotification.DoesNotExist:
                    return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                queryset_payment = PaymentNotification.objects.filter(user=request.user)
                serializer_payment = PaymentNotificationSerializer(queryset_payment, many=True)
                return Response(serializer_payment.data, status=status.HTTP_200_OK)
        
        elif request.method == 'POST':
            serializer_payment = PaymentNotificationSerializer(data=request.data)
            if serializer_payment.is_valid():
                serializer_payment.save(user=request.user)
                return Response(serializer_payment.data, status=status.HTTP_201_CREATED)
            return Response(serializer_payment.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get', 'post'], url_path='appointment(/(?P<pk>[^/.]+))?')
    def handle_appointment(self, request, pk=None):
        if request.method == 'GET':
            if pk:
                try:
                    appointment = AppointmentNotification.objects.get(pk=pk, user=request.user)
                    serializer = AppointmentNotificationSerializer(appointment)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except AppointmentNotification.DoesNotExist:
                    return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
            else:
                queryset_appointment = AppointmentNotification.objects.filter(user=request.user)
                serializer_appointment = AppointmentNotificationSerializer(queryset_appointment, many=True)
                return Response(serializer_appointment.data, status=status.HTTP_200_OK)
        
        elif request.method == 'POST':
            serializer_appointment = AppointmentNotificationSerializer(data=request.data)
            if serializer_appointment.is_valid():
                serializer_appointment.save(user=request.user)
                return Response(serializer_appointment.data, status=status.HTTP_201_CREATED)
            return Response(serializer_appointment.errors, status=status.HTTP_400_BAD_REQUEST)
        


        


class PaymentNotificationViewSet(viewsets.ModelViewSet):
    queryset = PaymentNotification.objects.all()
    serializer_class = PaymentNotificationSerializer
    
    # override the list method        
    def list(self, request):
        # Get all the PaymentNotification Objects then get their row_id and model_id to get the actual object and serialize it
        payment_notifications = PaymentNotification.objects.all()
        for payment_notification in payment_notifications:
            model = payment_notification.model_id.model_class().objects.get(id=payment_notification.row_id)
            if model:
                serializer = PaymentSerializer(model)
                return Response(serializer.data)
            else:
                return Response({'message': 'No model found'})
            
class AppointmentNotificationViewSet(viewsets.ModelViewSet):
    queryset = AppointmentNotification.objects.all()
    serializer_class = AppointmentNotificationSerializer
    
    # override the list method        
    def list(self, request):
        # Get all the AppointmentNotification Objects then get their row_id and model_id to get the actual object and serialize it
        appointment_notifications = AppointmentNotification.objects.all()
        for appointment_notification in appointment_notifications:
            model = appointment_notification.model_id.model_class().objects.get(id=appointment_notification.row_id)
            if model:
                serializer = AppointmentSerializer(model)
                return Response(serializer.data)
            else:
                return Response({'message': 'No model found'})            
            

            