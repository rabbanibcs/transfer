from django.shortcuts import render
from .models import Todo
from rest_framework import viewsets
from .serializer import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


