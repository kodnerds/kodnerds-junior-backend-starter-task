from django.urls import path

from .views import ArticleDetail, ArticleList

urlpatterns = [
    path("articles/", ArticleList.as_view(), name="article-detail"),
    path("articles/<int:id>/", ArticleDetail.as_view(), name="article-list"),
]
