import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Messages,ChatRoom
from django.contrib.auth.models import User


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print('-----connect-----')

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        # print('scope',self.scope )

        # print('room_group_name',self.room_group_name)
        # print('room_name',self.room_name)
        # print('channel_name',self.channel_name)
        room=ChatRoom.objects.get(name=self.room_name)
        messages=Messages.objects.filter(room=room).values('text','sender')
        print(messages)
        
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.send(text_data=json.dumps(
            {
            'message': list(messages)
            }

            )) 
        

    def disconnect(self, close_code):
        print('-----disconnect-----')

        # print('close_code',close_code)
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from user
    def receive(self, text_data):
        print('-----receive-----')
        print('text_data',text_data)
        text_data_json = json.loads(text_data)
        # print('text_data_json-message',text_data_json['message'])
        message = text_data_json['message']
        print('meassage',message)
        sender = self.scope['user']

        mess=[{
            'text':message,
            'sender':sender.id}]
        print(mess)
        recipient = text_data_json['recipient']
        print('sender', sender.id)
        # print('recipient', recipient)
        recipient=User.objects.get(pk=recipient)
        room=ChatRoom.objects.get(name=self.room_name)
        m=Messages(text=message,sender=sender,recipient=recipient,room=room)
        m.save()
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': mess
            }
        )

    # -------------------
    def chat_message(self, event):
        print('-----send-----')

        # print('event',event)
        message = event['message']
        print('chat-mess',message)
        sender = self.scope['user']
        
        # Send message to clients
        self.send(text_data=json.dumps({
            'message': message

        }
))