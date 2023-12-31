from rest_framework import viewsets, permissions, status
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from dotenv import load_dotenv
import openai
import os
from accounts.models import MyUser

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        
        user_profile = MyUser.objects.get(id=self.request.user.id)
        user_profile.posting_num += 1
        user_profile.save()
        
        instance.answer = get_chat_ai_response(instance.question)
        instance.save()
        
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        if pk is not None:
            post = self.get_object()
            user = request.user

            if user in post.like_users.all():
                return Response({'detail': '이미 좋아요를 눌렀습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            post.like += 1
            post.like_users.add(user)
            post.save()
            
            user_profile = MyUser.objects.get(id=user.id)
            user_profile.like_num += 1
            user_profile.save()

            return Response({'detail': '좋아요 완료'}, status=status.HTTP_200_OK)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        post = get_object_or_404(Post, id=post_id)
        return Comment.objects.filter(post=post)
    
    def perform_create(self, serializer):
        post_id = self.kwargs.get('post_id')
        post = get_object_or_404(Post, id=post_id)
        serializer.save(user=self.request.user, post=post)
        
        user_profile = MyUser.objects.get(id=self.request.user.id)
        user_profile.comment_num += 1
        user_profile.save()

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def get_chat_ai_response(question):
    if not question:
        return None

    model_engine = "text-davinci-003"
    completions = openai.Completion.create(
        engine=model_engine,
        prompt=f"System: 지식인 답변자인 당신은 질문에 맞는 알맞은 답변을 해줍니다.\nUser: {question}",
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    response = completions.choices[0].text.strip()[8:]
    return response