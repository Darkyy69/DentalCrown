from rest_framework import serializers
from rest_framework import serializers
from clinic.serializers import PaymentSerializer, AppointmentSerializer
from ..models import PaymentNotification, AppointmentNotification

class PaymentNotificationSerializer(serializers.ModelSerializer):
    model_data = serializers.SerializerMethodField()

    class Meta:
        model = PaymentNotification
        fields = '__all__'

    def get_model_data(self, obj):
        model_class = obj.model_id.model_class()
        try:
            instance = model_class.objects.get(pk=obj.row_id)
            return PaymentSerializer(instance).data
        except model_class.DoesNotExist:
            return None


class AppointmentNotificationSerializer(serializers.ModelSerializer):
    model_data = serializers.SerializerMethodField()

    class Meta:
        model = AppointmentNotification
        fields = '__all__'

    def get_model_data(self, obj):
        model_class = obj.model_id.model_class()
        try:
            instance = model_class.objects.get(pk=obj.row_id)
            return AppointmentSerializer(instance).data
        except model_class.DoesNotExist:
            return None