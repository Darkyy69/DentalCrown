import json
from channels.generic.websocket import AsyncWebsocketConsumer, JsonWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope.get('user', False)
        if not user:
            await self.close()
        self.user = self.scope['user']
        self.user_group_name = f'user_{str(self.user.id)}'
        
        await self.channel_layer.group_add(
            self.user_group_name,
            self.channel_name
        )
        print(f'Added {self.channel_name} channel to {self.user_group_name} group')

        self.user_role_name = f'user_role_{str(self.user.role)}'
        await self.channel_layer.group_add(
            self.user_role_name,
            self.channel_name
        )

        print(f'Added {self.channel_name} channel to {self.user_role_name} group')
        # Get all the Posts of the current user
        # posts = await self.get_user_posts()
        # await self.send(text_data=json.dumps({
        #      'type': 'GET_POSTS',
        #     'posts': posts
        # }))
        await self.accept()

        print(f"User {self.user.username} with role '{self.user.role}' connected to WebSocket.")



    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.user_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        
        # Handle received data
        if 'type' in data:
            if data['type'] == 'notification':
                self.handle_notification(data)
            elif data['type'] == 'appointment_done':
                self.handle_appointment_done(data)
            # Add more types as needed

    async def handle_notification(self, data):
        # Process notification
        pass

    async def handle_appointment_done(self, data):
        # Process appointment done
        # payment = data['payment']

        pass    

    # async def receive(self, text_data):
    #     # data = json.loads(text_data)
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json['message']
    #     # sender = text_data_json['sender']

    #     print(text_data_json)
    #     event = {
    #         'type': 'send_notification',
    #         'message': message
    #     }

    #     await self.send(text_data=json.dumps({
    #         'message': 'received message from the server'
        
    #     }))

    #     # send message to group
    #     await self.channel_layer.group_send(
    #         self.user_group_name,
    #         event
    #     )

    async def send_notification(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message,
        }))

    async def send_payment_popup(self, event):
        message = event['message']
        action = event['action']
        target = event['target']
        if 'appointment' in event:
            appointment = event['appointment']
        else:
            appointment = None
        # appointment = event['appointment']
        # treatment_id = event['treatment_id']
        await self.send(text_data=json.dumps({
            'message': message,
            'action': action,
            'target': target,
            'appointment': appointment,
            # 'treatment_id': treatment_id,
        }))     
