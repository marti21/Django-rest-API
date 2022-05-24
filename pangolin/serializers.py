from rest_framework import serializers
from .models import Post, UserPangolin, Comentario, FriendRequest

#hiperlink si tienen relacion

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['pk','url','title', 'description','created_at','author','image']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPangolin
        fields = ['id','username','first_name', 'last_name','email','date_joined','image', 'my_date_field','friends']

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['pk','author','post','text','created_at']

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['pk','from_user','to_user']