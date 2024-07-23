from rest_framework import serializers
from user.serializers import CustomUserSerializer
from user.models import CustomUser
from .models import Establishment, Patient, Speciality, DentalService, SubCategoryService, Appointment, Treatment, Payment, Consumable, Diagnostic

class EstablishmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Establishment
        fields = '__all__'
class DiagnosticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnostic
        fields = '__all__'

class SpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Speciality
        fields = '__all__'

class DentalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DentalService
        fields = '__all__'

class SubCategoryServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategoryService
        fields = '__all__'

class ConsumableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumable
        fields = '__all__'
class PatientSerializer(serializers.ModelSerializer):
    # dentist = CustomUserSerializer()
    dentist = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'email', 'address', 'gender', 'dentist', 'full_name']

    def get_full_name(self, obj):
        # Define titles based on gender
        titles = {
            'M': 'Mr. ',
            'F': 'Mrs. ',
        }
        
        # Get title based on gender or default to empty string
        title = titles.get(obj.gender, '')
        
        # Format full name
        full_name = f"{title}{obj.last_name.upper()} {obj.first_name.capitalize()}"
        
        return full_name
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dentist'] = CustomUserSerializer(instance.dentist).data
        return representation
    

class TreatmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    dentist = CustomUserSerializer()
    diagnostic = DiagnosticSerializer()
    class Meta:
        model = Treatment
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    dentist = CustomUserSerializer()
    treatment = TreatmentSerializer()
    status_display = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'dentist', 'date', 'start_hour', 'end_hour', 'treatment', 'status', 'status_display', 'comment']

    def get_status_display(self, obj):
        return obj.get_status_display()

class PaymentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    dentist = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    treatment = serializers.PrimaryKeyRelatedField(queryset=Treatment.objects.all())

    class Meta:
        model = Payment
        fields = ['id', 'patient', 'dentist', 'treatment', 'current_user', 'date', 'amount']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dentist'] = CustomUserSerializer(instance.dentist).data
        representation['patient'] = PatientSerializer(instance.patient).data
        representation['treatment'] = TreatmentSerializer(instance.treatment).data
        return representation
