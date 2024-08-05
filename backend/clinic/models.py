from django.db import models
from django.core.exceptions import ValidationError

from django.db.models.signals import pre_save
from django.dispatch import receiver
from datetime import date, datetime
from notification.models import AppointmentNotification
from user.models import CustomUser
from django.http import JsonResponse

class Establishment(models.Model):
    name = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    landline = models.CharField(max_length=15)
    phone_number1 = models.CharField(max_length=15)
    phone_number2 = models.CharField(max_length=15)
    email = models.EmailField()
    website = models.URLField()
    clinic_speciality = models.TextField()
    # logo = models.ImageField(upload_to='logos/')

    def __str__(self):
        return self.name

class Patient(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices
    =[
        ('M', 'Male'),
        ('F', 'Female'),
    ])
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'dentist'})
        


    def __str__(self):
        return f"{self.first_name} {self.last_name}"
        
class Speciality(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class DentalService(models.Model):
    speciality = models.ForeignKey(Speciality, related_name='clinic', on_delete=models.CASCADE)
    service_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.service_name
class SubCategoryService(models.Model):
    category = models.ForeignKey(DentalService, related_name='clinic', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name    
class Diagnostic(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name    
    

class Tooth(models.Model):
    code = models.CharField(max_length=2, primary_key=True)

    class Meta:
        verbose_name_plural = 'Teeth'

    def __str__(self):
        return self.code    
    
class Treatment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.DO_NOTHING)
    dentist = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, limit_choices_to={'role': 'dentist'})
    teeth = models.ManyToManyField(Tooth)
    start_date = models.DateField(editable=False, default=date.today)
    end_date = models.DateField(blank=True, null=True)
    # diagnostic would be choisable from a list of possible diagnostics
    diagnostic = models.ForeignKey(Diagnostic, on_delete=models.CASCADE)
    notes = models.TextField(max_length=1000, blank=True, null=True)
    price = models.FloatField()
    status = models.TextField(max_length=100, default='P', choices=[
        ('D', 'Done'),
        ('P', 'Pending'),
        ('C', 'Canceled'),
    ])
    consumable = models.ForeignKey('Consumable', on_delete=models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return f"Treatment for {self.patient} started on {self.start_date}"
    
    def save(self, *args, **kwargs):
        if not self.start_date:
            self.start_date = date.today()

        # If status is set to 'D', set end_date to today's date
        if self.status == 'D' or self.status == 'C':
            self.end_date = date.today()

        # Ensure status cannot be changed from 'D' to another status
        if self.pk is not None:  # Check if this is an update to an existing record
            orig = Treatment.objects.get(pk=self.pk)
            if orig.status in ['D', 'C'] and self.status != orig.status:
                return JsonResponse({'error': 'Cannot change status from ' + orig.status + ' to another status.'}, status=400)

        super().save(*args, **kwargs)
    
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'dentist'})
    date = models.DateField()
    start_hour = models.TimeField(default='00:00:00')
    end_hour = models.TimeField(default='00:00:00')
    treatment = models.ForeignKey(Treatment, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=2, default='P', choices
    =[
        ('D', 'Done'),
        ('M', 'Missed'),
        ('CP', 'Canceled by Patient'),
        ('CD', 'Canceled by Dentist'),
        ('R', 'Rescheduled'),
        ('A', 'Active'),
        ('P', 'Pending')

    ])
    comment = models.TextField(blank=True, null=True)
    task_terminate_flag = models.BooleanField(default=False)
    task_end_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Appointment with {self.dentist} on {self.date}"
    
    # def save(self, *args, **kwargs):
    #     # Ensure status cannot be changed when it is set to 'D,M,CP,CD,R'
    #     if self.pk is not None:
    #         orig = Appointment.objects.get(pk=self.pk)
    #         if orig.status in ['D', 'M', 'CP', 'CD', 'R'] and self.status in ['A', 'P', 'D', 'M', 'CP', 'CD', 'R']:
    #             return JsonResponse({'error': 'Cannot change status from ' + orig.status + ' to another status.'}, status=400)
    #     super().save(*args, **kwargs)
    
    def clean(self):
        super().clean()
        if self.treatment and self.treatment.patient != self.patient:
            return JsonResponse({'error': 'The treatment does not belong to the selected patient.'}, status=400)
        
@receiver(pre_save, sender=Appointment)
def validate_treatment_patient_relation(sender, instance, **kwargs):
    if instance.treatment and instance.treatment.patient != instance.patient:
        return JsonResponse({'error': 'The treatment does not belong to the selected patient.'}, status=400)      

class Payment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.DO_NOTHING)
    dentist = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    treatment = models.ForeignKey(Treatment, on_delete=models.DO_NOTHING)
    current_user = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, related_name='current_user')
    date = models.DateTimeField(auto_now_add=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Payment of {self.amount} by {self.patient} on {self.date}"
    
@receiver(pre_save, sender=Payment)
def mark_notification_opened(sender, instance, **kwargs):
    # Before saving the payment, check if the payment is already created
    # If it is, mark the appointment notification as opened
    # If it is not, create a new appointment notification
    print("zb")
    payment_date = instance.date or datetime.now().date()
    payment_treatment = instance.treatment
    payment_patient = instance.patient
    payment_amount = instance.amount
    print(f"line 173: {payment_date}, {payment_treatment}, {payment_patient}, {payment_amount}")

    treatment = Treatment.objects.get(id=payment_treatment.id)
    treatment_price = treatment.price
    print(f"line 177: {treatment_price}")
    payments = Payment.objects.filter(treatment=payment_treatment)
    print(f"line 179: {payments}")
    total_payment_amount = 0
    if not payments:
        total_payment_amount = instance.amount
    else:
        for payment in payments:
            total_payment_amount += payment.amount
        total_payment_amount += instance.amount    
    difference = float(treatment_price) - float(total_payment_amount)
    print(f"line 184: {difference}")
    if difference < 0:
        raise ValidationError('The payment amount is greater than the remaining balance.')
        # return JsonResponse({'error': 'The payment amount is greater than the remaining balance.'}, status=400)
    if difference == 0:
        treatment.status = 'D'
        treatment.save()
    appointment_notifications = AppointmentNotification.objects.filter(opened=False, created_at__gte=payment_date) 
    print(f"line 189: {appointment_notifications}")
    for appointment_notification in appointment_notifications:
        appointment_id = appointment_notification.row_id
        appointment = Appointment.objects.get(id=appointment_id)
        if appointment.treatment == payment_treatment and appointment.patient == payment_patient:
            print(f"line 194: {appointment}")
            appointment_notification.opened = True
            appointment_notification.save()
    return


class Consumable(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    status = models.CharField(max_length=2, choices=[
        ('A', 'Available'),
        ('U', 'Used'),
        ('O', 'Out of Stock'),
    ])

    def __str__(self):
        return f"{self.name} - {self.price} - {self.quantity} - {self.status}"