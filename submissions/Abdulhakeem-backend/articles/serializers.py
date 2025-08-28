from rest_framework import serializers
from datetime import datetime
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'author', 'date', 'title', 'description', 'image', 'views', 'likes', 'comments', 'readMore', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, attrs):
        for field in ['views', 'likes', 'comments']:
            if attrs.get(field) is not None and attrs[field] < 0:
                raise serializers.ValidationError({field: 'Must be a non-negative integer'})
        return attrs

    def to_internal_value(self, data):
        # Allow date strings like "23 May, 2024"
        if 'date' in data and isinstance(data['date'], str):
            try:
                data = data.copy()
                data['date'] = datetime.strptime(data['date'], '%d %B, %Y').date()
            except ValueError:
                pass  # DRF will attempt its own parsing/date validation
        return super().to_internal_value(data)

