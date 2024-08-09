from rest_framework import serializers
from user.serializers import CustomUserSerializer
from user.models import CustomUser
from .models import Establishment, Patient, Speciality, DentalService, SubCategoryService, SubSubCategoryService, Appointment, Treatment, Payment, Consumable, Diagnostic, Tooth

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

class SubSubCategoryServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubSubCategoryService
        fields = '__all__'        

class ConsumableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consumable
        fields = '__all__'
class PatientSerializer(serializers.ModelSerializer):
    # dentist = CustomUserSerializer()
    dentist = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    full_name = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()
    total_treatment_amount = serializers.SerializerMethodField()
    payed = serializers.SerializerMethodField()
    left_to_pay = serializers.SerializerMethodField()


    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'email', 'address', 'gender', 'dentist', 'full_name', 'age', 'payed', 'left_to_pay', 'total_treatment_amount']

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
    
    def get_age(self, obj):
        import datetime
        today = datetime.date.today()
        age = today.year - obj.date_of_birth.year - ((today.month, today.day) < (obj.date_of_birth.month, obj.date_of_birth.day))
        return age
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dentist'] = CustomUserSerializer(instance.dentist).data
        return representation
    
    def get_total_treatment_amount(self, obj):
        treatments = Treatment.objects.filter(patient=obj)
        total_treatment_amount = sum(float(treatment.price) for treatment in treatments)
        return total_treatment_amount
    
    def get_payed(self, obj):
        payments = Payment.objects.filter(patient=obj)
        payed = sum(float(payment.amount) for payment in payments)
        return payed

    def get_left_to_pay(self, obj):
        left_to_pay = self.get_total_treatment_amount(obj) - self.get_payed(obj)
        return left_to_pay
    
class ToothSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tooth
        fields = '__all__'


class TreatmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    dentist = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    diagnostic = serializers.PrimaryKeyRelatedField(queryset=Diagnostic.objects.all(), allow_null=True)

    status_display = serializers.SerializerMethodField()
    class Meta:
        model = Treatment
        fields = ['id', 'patient', 'dentist', 'tooth', 'start_date', 'end_date', 'diagnostic', 'notes', 'price', 'treatment_name', 'status', 'status_display', 'consumable']
        # fields = '__all__'

    def get_status_display(self, obj):
        return obj.get_status_display()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dentist'] = CustomUserSerializer(instance.dentist).data
        representation['patient'] = PatientSerializer(instance.patient).data
        representation['diagnostic'] = DiagnosticSerializer(instance.diagnostic).data
        return representation
    

    


class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    dentist = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    treatment = serializers.PrimaryKeyRelatedField(queryset=Treatment.objects.all(), many=True)
    status_display = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'dentist', 'date', 'start_hour', 'end_hour', 'treatment', 'status', 'status_display', 'comment']

    def get_status_display(self, obj):
        return obj.get_status_display()
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dentist'] = CustomUserSerializer(instance.dentist).data
        representation['patient'] = PatientSerializer(instance.patient).data
        representation['treatment'] = TreatmentSerializer(instance.treatment, many=True).data
        return representation

class PaymentSerializer(serializers.ModelSerializer):
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all())
    dentist = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    treatment = serializers.PrimaryKeyRelatedField(queryset=Treatment.objects.all())
    left_to_distribute = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ['id', 'patient', 'dentist', 'treatment', 'current_user', 'date', 'amount', 'left_to_distribute']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dentist'] = CustomUserSerializer(instance.dentist).data
        representation['patient'] = PatientSerializer(instance.patient).data
        representation['treatment'] = TreatmentSerializer(instance.treatment).data
        return representation
    
    def get_left_to_distribute(self, obj):
        payments = Payment.objects.filter(treatment=obj.treatment)
        return float(obj.treatment.price) - sum(float(payment.amount) for payment in payments)
