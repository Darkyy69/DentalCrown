# Create a signal that listens to the PaymentNotification model and AppointmentNotification model
# and marks them as seen after the creation of the notification

from django.db.models.signals import post_save
from django.dispatch import receiver
from notification.models import PaymentNotification, AppointmentNotification
from datetime import datetime

@receiver(post_save, sender=PaymentNotification)
# @receiver(post_save, sender=AppointmentNotification)
def mark_notification_as_seen(sender, instance, created, **kwargs):
    if created:
        # payment_patient = instance.model_id.model_class().objects.filter(id=instance.row_id).first().patient
        # payment_dentist = instance.model_id.model_class().objects.filter(id=instance.row_id).first().dentist
        # payment_treatment = instance.model_id.model_class().objects.filter(id=instance.row_id).first().treatment
        payment_date = instance.model_id.model_class().objects.filter(id=instance.row_id).first().date
        print(payment_date)
        # notification_user = instance.user
        notification_appointment = AppointmentNotification.objects.filter(opened=False, created_at__date__gte=payment_date.date())
        print(notification_appointment)
        for appointment in notification_appointment:
            appointment.opened = True
            appointment.save()
        # notification_appointment.opened = True
        # instance.save()

