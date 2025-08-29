# core/tests/test_serializers.py
from django.test import TestCase

from core.serializers import ArticleSerializer


class ArticleSerializerTest(TestCase):
    def test_valid_data(self):
        data = {
            "title": "Valid Title",
            "author": "Author",
            "date": "25 May 2024",
            "description": "Description",
            "image": "https://example.com/image.jpg",
            "views": 10,
            "likes": 5,
            "comments": 2,
        }
        serializer = ArticleSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_invalid_title(self):
        data = {
            "title": "Hi",  # Too short
            "author": "Author",
            "date": "25 May 2024",
            "description": "Description",
            "image": "https://example.com/image.jpg",
            "views": 10,
            "likes": 5,
            "comments": 2,
        }
        serializer = ArticleSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)
