from rest_framework import serializers
from .models import MyUser

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'username', 'email', 'posting_num', 'comment_num', 'like_num')