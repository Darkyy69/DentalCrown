# from django.db.models.signals import pre_save
# from django.dispatch import receiver
# from django.core.exceptions import ValidationError
# from .models import Appointment

# @receiver(pre_save, sender=Appointment)
# def validate_treatment_patient_relation(sender, instance, **kwargs):
#     if instance.treatment and instance.treatment.patient != instance.patient:
#         raise ValidationError('The treatment does not belong to the selected patient.')


from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Payment, Appointment
from django.utils import timezone
from notification.models import PaymentNotification, ContentType
from django.contrib.auth import get_user_model

User = get_user_model()


# @receiver(pre_save, sender=Payment)
# def payment_created(sender, instance, **kwargs):
#     print(f"Payment detected: {instance}")
#     # Find related appointment
#     appointments = Appointment.objects.filter(
#         patient=instance.patient,
#         treatment=instance.treatment,
#         dentist=instance.dentist,
#         date__gte=timezone.now().date(),  # Assuming date is a date field
#         status='D'
#     )
#     print(appointments)
#     print(f'Dentist: {instance.dentist}, Patient: {instance.patient}')
#     if appointments.exists():
#         appointment = appointments.first()
#         # Set the flag in the appointment
#         appointment.task_terminate_flag = True
#         appointment.save()
        
#         # Access the payment amount
#         payment_amount = instance.amount
#         print(f"Payment amount for the appointment: {payment_amount}")

#     # Perform additional logic here
#     print(f"Payment detected: {instance}")
#     # Implement your post-payment logic here
#     # Check who made the payment and create a notification for the other party

#     # Check if the current user is the patient or the dentist
#     if instance.current_user == instance.dentist:
#         # Create a notification for all receptionists
#         for receptionist in User.objects.filter(role='receptionist'):
#             PaymentNotification.objects.create(user=receptionist, model_id=ContentType.objects.get_for_model(Payment), row_id=instance.id)
#     PaymentNotification.objects.create(user=instance.dentist,model_id=ContentType.objects.get_for_model(Payment), row_id=instance.id)
