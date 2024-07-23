from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

def broadcast_payment_popup(user_id, message, action, target, appointment):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'user_role_receptionist',
            {
                'type': 'send_payment_popup',
                'message': message,
                'action': action,
                'target': target,
                'appointment': appointment,

            }
        )
        async_to_sync(channel_layer.group_send)(
            'user_' + str(user_id),
            {
                'type': 'send_payment_popup',
                'message': message,
                'action': action,
                'target': target,
                'appointment': appointment,

            }
        )

# Send WebSocket notification to the Payment's dentist (channel: user_{dentist_id}) 
def unicast_payment_popup(user_id, message, action, target):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'user_{user_id}',
        {
            'type': 'send_payment_popup',
            'message': message,
            'action': action,
            'target': target,
        }
    )

def disable_receptionist_payment_popup( message, action, target):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'user_role_receptionist',
        {
            'type': 'send_payment_popup',
            'message': message,
            'action': action,
            'target': target,

        }
    )        



from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.core.exceptions import ValidationError as DjangoValidationError

def payment_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, DjangoValidationError):
        response = Response(
            data={'error': str(exc)},
            status=400
        )

    return response    