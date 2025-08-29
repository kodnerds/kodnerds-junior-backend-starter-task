from django.core.exceptions import ObjectDoesNotExist

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, ValidationError


from .models import Article
from .serializers import ArticleSerializer


class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.filter(is_active=True)
    serializer_class = ArticleSerializer

    def handle_exception(self, exc):
        """Global exceptio handling for ListCreate view"""
        if isinstance(exc, ValidationError):
            return Response(
                {
                    'error': "Validation failed",
                    'details': exc.detail
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().handle_exception(exc)

    # In ArticleList class


def create(self, request, *args, **kwargs):
    """Enhanced create with better error response"""
    try:
        return super().create(request, *args, **kwargs)
    except Exception as e:
        # Clean up the error message format
        if hasattr(e, "detail"):
            # DRF validation error
            return Response(
                {"error": "Validation failed", "details": e.detail},
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            # Other exceptions
            return Response(
                {"error": "Failed to create article", "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ArticleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.filter(is_active=True)
    serializer_class = ArticleSerializer
    lookup_field = 'id'

    def handle_exception(self, exc):
        """Global exception handling for Detail view"""
        if isinstance(exc, ObjectDoesNotExist) or isinstance(exc, NotFound):
            return Response(
                {
                    "error": "Article not found",
                    "message": "The requested article does not exist or has been deleted.",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
        elif isinstance(exc, ValidationError):
            return Response(
                {"error": "Validation failed", "details": exc.detail},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().handle_exception(exc)

    def perform_destroy(self, instance):
        """Soft delete implementation"""
        instance.is_active = False
        instance.save()

    def destroy(self, request, *args, **kwargs):
        """Enhanced delete with better response"""
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(
                {"message": "Article deleted successfully", "article_id": instance.id},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Exception as e:
            return Response(
                {"error": "Failed to delete article", "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
