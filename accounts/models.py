from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import MyUserManager

class MyUser(AbstractUser):
    posting_num = models.IntegerField(default=0)
    comment_num = models.IntegerField(default=0)
    like_num = models.IntegerField(default=0)
    
    objects = MyUserManager()
    
    def __str__(self):
        return self.username