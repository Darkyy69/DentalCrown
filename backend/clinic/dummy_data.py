from clinic.models import Patient, Appointment, Treatment, Payment, Diagnostic, Consumable
from user.models import CustomUser 
from datetime import date


def create_dummy_data():
    dentist, created = CustomUser.objects.get_or_create(username="dr.zakaria", defaults={"password": "moncef2000", "first_name": "Zakaria", "last_name": "Abdelaidoum", "email": "radiasweetgirl812@gmail.com", "birth_date": "2000-01-05", "address": "12 Rue Mohamed Chabane", "gender": "M", "role": "dentist", "phone_number": "0559879090"})
    receptionist, created = CustomUser.objects.get_or_create(username="r.insaf", defaults={"password": "moncef2000", "first_name": "Insaf", "last_name": "Guermi", "email": "xyz@gmail.com", "birth_date": "1998-01-05", "address": "12 Rue Mohamed Chabane", "gender": "F", "role": "receptionist", "phone_number": "0664123587"})
    mourad, created = Patient.objects.get_or_create(first_name="Mourah", last_name="MagomedSharipov", date_of_birth="2003-03-05", phone_number="0664123587", email="azy@gmail.com", address="babi7sen", gender="M", dentist=dentist)
    # consumable, created = Consumable.objects.get_or_create(name="Shkara chema", defaults={"price": 100, "quantity": 10, "status": "A"})
    diagnosis = Diagnostic.objects.get(name="Cavité")
    treatment, created = Treatment.objects.get_or_create(patient=mourad, dentist=dentist, diagnostic=diagnosis, defaults={"notes": "cc cv", "price": 4000, "status": "P"}, treatment_name = "na7itlou sena")
    treatment.teeth.set(['11', '12'])
    start_hour = "09:00:00"
    end_hour = "09:30:00"
    appointment, created = Appointment.objects.get_or_create(patient=mourad, dentist=dentist, date=date.today(), start_hour=start_hour, end_hour=end_hour, treatment=treatment, defaults={"status": "P", "comment": "cc"})