from celery import shared_task
from notification.models import PaymentNotification, AppointmentNotification
from datetime import datetime, timedelta
from clinic.models import Payment
from time import sleep
from django.core.cache import cache

@shared_task
def delete_all_notifications():
    try:
        PaymentNotification.objects.all().delete()
        AppointmentNotification.objects.all().delete()
        print('All Notifications deleted!')
    except Exception as e:
        print(f'Error deleting Payment Notifications: {e}')

from celery import shared_task
from datetime import datetime, timedelta
from time import sleep
from clinic.models import Appointment
from django.utils import timezone
import json
from clinic.utils import broadcast_payment_popup, unicast_payment_popup, disable_receptionist_payment_popup


@shared_task
def check_payment_flag(appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        
        if appointment.task_terminate_flag or timezone.now() >= appointment.task_end_time:
            # Perform any cleanup or post-task logic here
            print("Task terminated early due to payment or end of 30 minutes.")
            target = 'payment-popup'
            action = 'disable'
            # Get the payment instance
            payment = Payment.objects.filter(patient=appointment.patient, treatment=appointment.treatment, date__gte=timezone.now()-timedelta(minutes=30)).first()
            # Check whether the task terminated because of the  appointment.task_terminate_flag or the time expired
            if appointment.task_terminate_flag:
                # Perform logic for accepting payment from the receptionist/dentist side
                # Send WebSocket message to the dentist/receptionist to remove the payment popup
                # disable_receptionist_payment_popup(json.dumps(message), action, target)
                if payment:
                    # Get the current user of the payment
                    current_user = payment.current_user
                    
                    
                    if str(current_user.id) == str(payment.dentist.id):
                        print("Payment received by the dentist.")
                        # Remove the payment popup from the receptionist's side
                        message = f'{appointment.patient} has paid for this treatment.'
                        
                        disable_receptionist_payment_popup(json.dumps(message), action, target)
                        return
                    else:
                        print(f"Payment received by the receptionist: {current_user.username}. Notify the dentist. ")  
                        # Notify the dentist that the payment has been received
                        message = f'{appointment.patient} has paid for this treatment.'
                        unicast_payment_popup(payment.dentist.id,json.dumps(message), action, target)
                        return
                else:
                    print("There was an error.")  
            else:
                # Perform logic for not receiving payment in time (receptionist side)
                print("Payment not received in time. Notify the dentist.")
                # Notify the dentist that the payment has not been received in time by the receptionist
                # Get the appointment's dentist to notify
                message = f"{appointment.patient} hasn't paid for this treatment."
                unicast_payment_popup(appointment.dentist.id,json.dumps(message), action, target)
                # notify_dentist_payment_not_received(json.dumps(message), action, target)
                # Perform any additional logic here

            return
        else:
            # Reschedule the task to run again if the flag is not set and time has not expired
            check_payment_flag.apply_async((appointment_id,), countdown=20)  # 5 minutes later/ 60 seconds later for development
    except Appointment.DoesNotExist:
        print("Appointment does not exist.")
        