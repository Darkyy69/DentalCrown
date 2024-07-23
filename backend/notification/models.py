from django.db import models
from django.conf import settings
#import content type
from django.contrib.contenttypes.models import ContentType

from django.db.models.signals import post_save
from django.dispatch import receiver
# from notification.models import PaymentNotification, AppointmentNotification
from datetime import datetime

# Create your models here.

class PaymentNotification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    model_id = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING)
    row_id = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    opened = models.BooleanField(default=False)
    def __str__(self):
        return f"Payment Notification for {self.model_id} {self.row_id}"
# @receiver(post_save, sender=PaymentNotification)
# @receiver(post_save, sender=AppointmentNotification)
# def mark_notification_as_seen(sender, instance, created, **kwargs):
    # if created:
        # payment_patient = instance.model_id.model_class().objects.filter(id=instance.row_id).first().patient
        # payment_dentist = instance.model_id.model_class().objects.filter(id=instance.row_id).first().dentist 
        # payment_treatment = instance.model_id.model_class().objects.filter(id=instance.row_id).first().treatment
        
        
        # payment_date = instance.model_id.model_class().objects.filter(id=instance.row_id).first().date
        # print(f"payment_date:{payment_date}")
        # # notification_user = instance.user
        # notification_appointment = AppointmentNotification.objects.filter(opened=False, created_at__gte=payment_date.date())
        # print(f"notification_appointment:{notification_appointment}")
        # for appointment in notification_appointment:
        #     appointment.opened = True
        #     appointment.save()
        
        
        # notification_appointment.opened = True
        # instance.save()    

    
class AppointmentNotification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    model_id = models.ForeignKey(ContentType, on_delete=models.DO_NOTHING)
    row_id = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    opened = models.BooleanField(default=False)
    def __str__(self):
        return f"Appointment Notification for {self.model_id} {self.row_id}"    