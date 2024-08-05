# from django.db.models.signals import pre_save
# from django.dispatch import receiver
# from django.core.exceptions import ValidationError
# from .models import Appointment

# @receiver(pre_save, sender=Appointment)
# def validate_treatment_patient_relation(sender, instance, **kwargs):
#     if instance.treatment and instance.treatment.patient != instance.patient:
#         raise ValidationError('The treatment does not belong to the selected patient.')


from django.db.models.signals import pre_save, post_migrate
from django.dispatch import receiver
from .models import Payment, Appointment
from django.utils import timezone
from notification.models import PaymentNotification, ContentType
from django.contrib.auth import get_user_model
from clinic.models import Tooth, Diagnostic

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


@receiver(post_migrate)
def populate_default_diagnostics(sender, **kwargs):
    if sender.name == 'clinic':
        default_diagnostics = [
            'Cavité', 'Gingivite', 'Parodontite', 'Abcès', 'Douleur dentaire', 'Bruxisme', 
            'Halitose', 'ATM', 'Cancer buccal', 'Xérostomie', 'Sensibilité dentaire', 'Aphtes', 
            'Candidose buccale', 'Érosion dentaire', 'Caries dentaires', 'Perte de dents', 
            'Décoloration des dents', 'Fracture dentaire', 'Abcès dentaire', 'Douleur dentaire', 
            'Sensibilité dentaire', 'Plaque dentaire', 'Pulpite', 'Nécrose pulpaire', 'Hypersensibilité dentinaire', 
            'Mauvaise haleine', 'Lésion carieuse', 'Mobilité dentaire', 'Rétention alimentaire', 'Récession gingivale'
        ]
        for diagnostic in default_diagnostics:
            Diagnostic.objects.get_or_create(name=diagnostic)
        
        print("diagnosteirj b1 ")

@receiver(post_migrate)
def create_teeth(sender, **kwargs):
    if sender.name == 'clinic':
        tooth_codes = [f"{x}{y}" for x in range(1, 5) for y in range(1, 9) if not (x == 2 and y > 8) and not (x == 4 and y > 8)]
        teeth_to_create = [Tooth(code=code) for code in tooth_codes]
        existing_teeth = Tooth.objects.filter(code__in=tooth_codes)
        teeth_to_create = [tooth for tooth in teeth_to_create if tooth.code not in existing_teeth.values_list('code', flat=True)]
        Tooth.objects.bulk_create(teeth_to_create, ignore_conflicts=True)
        print('Snan t3amerou b1')