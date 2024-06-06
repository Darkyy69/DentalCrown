from django.db import models
from user.models import CustomUser

class Patient(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'dentist'})
    date = models.DateTimeField()
    reason = models.TextField()

    def __str__(self):
        return f"Appointment with {self.dentist} on {self.date}"

class MedicalRecord(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateField()
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'dentist'})

    def __str__(self):
        return f"Medical Record for {self.patient} on {self.date}"

class Payment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField()
    description = models.TextField()

    def __str__(self):
        return f"Payment of {self.amount} by {self.patient} on {self.date}"
