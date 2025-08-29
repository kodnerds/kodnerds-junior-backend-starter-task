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

    def validate_title(self, value):
        """Validate title length and content"""
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        if len(value) > 250:
            raise serializers.ValidationError("Title cannot exceed 250 caharacters. ")
        return value.strip()

    def validate_author(self, value):
        """Validate author's name"""
        if len(value) < 2:
            raise serializers.ValidationError(
                "Author's name must be at least 2 character long."
            )
        return value.strip()

    def validate_views(self, value):
        """Validate view counts"""
        if value < 0:
            raise serializers.ValidationError("Likes cannot be negative")
        return value

    def validate_likes(self, value):
        """Validate likes count"""
        if value < 0:
            raise serializers.ValidationError("Likes cannot be negative")
        return value

    def validate_comments(self, value):
        """Validate comments count"""
        if value < 0:
            raise serializers.ValidationError("Comments cannot be negative")
        return value
    
    def validate_image(self, value):
        """Validate Image URL"""
        if value and not value.startswith(('http://', 'https://')):
            raise serializers.ValidationError(
                "Image must be a valid URL starting with http:// or https://"
            )
        return value
    
    def validate(self, data):
        """Cross-field validation"""
        # Example: Ensure views >= likes
        views = data.get('views', 0)
        likes = data.get('like', 0)

        if likes > views:
            raise serializers.ValidationError(
                {
                    'likes': 'Likes cannot exceed total views.'
                }
            )
        return data
