from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['author', 'date']
    search_fields = ['title', 'description', 'author']
    ordering_fields = ['date', 'views', 'likes', 'comments', 'title']

