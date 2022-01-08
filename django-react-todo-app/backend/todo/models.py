from django.db import models
from django.utils import timezone


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now)
    time = models.TimeField(default=timezone.now)
    # when = models.DateTimeField(blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.title
