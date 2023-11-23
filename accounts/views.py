from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import MyUser
from .serializers import MyUserSerializer

class ProfileViewSet(ListModelMixin, GenericViewSet):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # 현재 로그인된 사용자의 정보만을 반환
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)