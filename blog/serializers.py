from rest_framework import serializers
from .models import Post, Comment, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {
            'post': {'required': False}
        }

class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    category = serializers.SlugRelatedField(queryset=Category.objects.all(), slug_field='name', many=False)
    like_users = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'