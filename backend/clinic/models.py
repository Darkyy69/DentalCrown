from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver
from datetime import date
from user.models import CustomUser

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
    
class Treatment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.DO_NOTHING)
    dentist = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, limit_choices_to={'role': 'dentist'})
    teeth = models.IntegerField()
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
                raise ValidationError('Cannot change status from ' + orig.status + ' to another status.')

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

    def __str__(self):
        return f"Appointment with {self.dentist} on {self.date}"
    
    def save(self, *args, **kwargs):
        # Ensure status cannot be changed when it is set to 'D,M,CP,CD,R'
        if self.pk is not None:
            orig = Appointment.objects.get(pk=self.pk)
            if orig.status in ['D', 'M', 'CP', 'CD', 'R'] and self.status != orig.status:
                raise ValidationError('Cannot change status from "Done", "Missed", "Canceled by Patient", "Canceled by Dentist" or "Rescheduled" to another status.')
        super().save(*args, **kwargs)
    
    def clean(self):
        super().clean()
        if self.treatment and self.treatment.patient != self.patient:
            raise ValidationError('The treatment does not belong to the selected patient.')
        
@receiver(pre_save, sender=Appointment)
def validate_treatment_patient_relation(sender, instance, **kwargs):
    if instance.treatment and instance.treatment.patient != instance.patient:
        raise ValidationError('The treatment does not belong to the selected patient.')        

class Payment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    current_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='current_user')
    date = models.DateTimeField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paymenet_mode = models.CharField(max_length=2, choices=[
        ('CA', 'Cash'),
        ('CH', 'Check')
    ])
    source = models.CharField(max_length=100, choices=[
        ('P', 'Patient'),
        ('I', 'Insurance'),
    ])
    comment = models.TextField(max_length=1000)

    def __str__(self):
        return f"Payment of {self.amount} by {self.patient} on {self.date}"

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