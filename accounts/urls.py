from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path('join/', include("dj_rest_auth.registration.urls")),
    path('', include(router.urls)),
]