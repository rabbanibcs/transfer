from django.contrib import admin
from  .models import Messages,ChatRoom


@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user1', 'user2')
    list_filter = ('user1', 'user2')
    search_fields = ('name',)


@admin.register(Messages)
class MessagesAdmin(admin.ModelAdmin):
    list_display = ('id', 'room','sender', 'recipient', 'text', 'read')
    list_filter = ('sender', 'recipient', 'read')