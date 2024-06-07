from django.db import models
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
    email = models.EmailField(unique=True, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices
    =[
        ('M', 'Male'),
        ('F', 'Female'),
    ])
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'dentist'})
        


    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    dentist = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'dentist'})
    date = models.DateField()
    start_hour = models.TimeField(default='00:00:00')
    end_hour = models.TimeField(default='00:00:00')
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
    comment = models.TextField()

    def __str__(self):
        return f"Appointment with {self.dentist} on {self.date}"
    
class Treatement(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.DO_NOTHING)
    dentist = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, limit_choices_to={'role': 'dentist'})
    appointment = models.ForeignKey(Appointment, on_delete=models.DO_NOTHING, blank=True, null=True)
    teeth = models.IntegerField()
    # diagnostic would be choisable from a list of possible diagnostics
    diagnostic = models.TextField(max_length=100, choices=[
        
        ('Cavity', 'Cavity'),
        ('Gingivitis', 'Gingivitis'),
        ('Periodontitis', 'Periodontitis'),
        ('Abscess', 'Abscess'),
        ('Toothache', 'Toothache'),
        ('Bruxism', 'Bruxism'),
        ('Halitosis', 'Halitosis'),
        ('TMJ', 'TMJ'),
        ('Oral Cancer', 'Oral Cancer'),
        ('Dry Mouth', 'Dry Mouth'),
        ('Tooth Sensitivity', 'Tooth Sensitivity'),
        ('Mouth Sores', 'Mouth Sores'),
        ('Oral Thrush', 'Oral Thrush'),
        ('Tooth Erosion', 'Tooth Erosion'),
        ('Tooth Decay', 'Tooth Decay'),
        ('Tooth Loss', 'Tooth Loss'),
        ('Tooth Discoloration', 'Tooth Discoloration'),
        ('Tooth Fracture', 'Tooth Fracture'),
        ('Tooth Abscess', 'Tooth Abscess'),
        ('Toothache', 'Toothache'),
        ('Tooth Sensitivity', 'Tooth Sensitivity'),
    ])
    notes = models.TextField(max_length=1000)
    price = models.FloatField()
    status = models.TextField(max_length=100, choices=[
        ('D', 'Done'),
        ('P', 'Pending'),
        ('C', 'Canceled'),
    ])
    consumable = models.ForeignKey('Consumable', on_delete=models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return f"Treatement for {self.patient} on {self.date}"

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