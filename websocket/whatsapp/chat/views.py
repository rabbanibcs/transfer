from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Messages,ChatRoom
from django.contrib.auth.models import User
import json

@login_required
def index(request):
    users=User.objects.exclude(pk=request.user.id)
    return render(request, 'chat/index.html',{'users':users})

@login_required
def room(request,pk):

    user_to=User.objects.get(pk=pk)
    user_from=request.user
    print(user_from,' user from')
    print(user_to,' user to')

    if user_to.id > user_from.id:
        room_name='room'+str(user_from.id)+str(user_to.id)
    else:
        room_name='room'+str(user_to.id)+str(user_from.id)

    try:
        room=ChatRoom.objects.get(name=room_name)
    except:
        room=ChatRoom.objects.create(name=room_name,user1=user_from,user2=user_to)

    print('room_name ',room)
    # user_to = json.dumps(user_to)
    # print(user_to)
    return render(request, 'chat/room.html', {
        'room_name': room.name,
        'recipient':user_to,
    })


