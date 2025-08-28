from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='article')

urlpatterns = [
    path('', include(router.urls)),
]

