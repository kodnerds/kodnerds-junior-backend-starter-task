from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'date', 'views', 'likes', 'comments')
    search_fields = ('title', 'author')
    list_filter = ('author', 'date')

