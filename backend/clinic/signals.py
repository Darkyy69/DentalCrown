# from django.db.models.signals import pre_save
# from django.dispatch import receiver
# from django.core.exceptions import ValidationError
# from .models import Appointment

# @receiver(pre_save, sender=Appointment)
# def validate_treatment_patient_relation(sender, instance, **kwargs):
#     if instance.treatment and instance.treatment.patient != instance.patient:
#         raise ValidationError('The treatment does not belong to the selected patient.')
