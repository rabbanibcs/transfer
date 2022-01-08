from django.contrib import admin
from .models import Todo
from django.contrib.auth.models import Group
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title','date','completed']

admin.site.register(Todo,TodoAdmin)
admin.site.unregister(Group)
