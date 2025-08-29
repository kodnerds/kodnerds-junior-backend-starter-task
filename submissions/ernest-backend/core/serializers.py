from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    readMore = serializers.CharField(
        source='read_more', required=False, default="#"
        )  # Map to JSON field name

    class Meta:
        model = Article
        fields =['id', 'author', 'date','title', 'description',
        'image', 'views', 'likes','comments', 'readMore'
        ]
        read_only_fields = ('id', 'created_at', 'updated_at', 'is_active')
