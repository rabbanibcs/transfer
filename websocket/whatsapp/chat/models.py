from django.db import models
from django.contrib.auth.models import User
from django.conf import settings



class ChatRoom(models.Model):
    name=models.CharField(max_length=200,unique=True)
    user1 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="User1",
                              related_name="+", db_index=True)
    user2 = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="User2",
                              related_name="+", db_index=True)

    class Meta:
        unique_together = (('user1', 'user2'), ('user2', 'user1'))

    def __str__(self):
            return self.name

class Messages(models.Model):
    room=models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Sender",
                               related_name='from_user')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name="Recipient",
                                  related_name='to_user')
    text = models.TextField(verbose_name="Text", blank=True)

    read = models.BooleanField(verbose_name="Read", default=False)