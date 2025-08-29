from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from core.models import Article


class ArticleAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Use the correct URL pattern names from your urls.py
        self.list_url = reverse("article-list")  # This must match name in urls.py
        self.article = Article.objects.create(
            title="Test Article",
            author="Test Author",
            date="25 May 2024",
            description="Test description",
            image="https://example.com/image.jpg",
            views=10,
            likes=5,
            comments=2,
        )
        self.detail_url = reverse("article-detail", kwargs={"id": self.article.id})

    def test_get_articles(self):
        """Test retrieving list of articles"""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_article(self):
        """Test creating a new article"""
        data = {
            "title": "New Article",
            "author": "New Author",
            "date": "26 May 2024",
            "description": "New description",
            "image": "https://example.com/new.jpg",
            "views": 15,
            "likes": 8,
            "comments": 3,
        }

        response = self.client.post(self.list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 2)

    def test_validation_errors(self):
        """Test that validation returns proper error messages"""
        data = {
            "title": "Hi",  # Too short
            "author": "Test",
            "date": "25 May 2024",
            "description": "Test",
            "image": "invalid-url",
            "views": -5,  # Negative
            "likes": 10,
        }

        response = self.client.post(self.list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data["details"])
        self.assertIn("image", response.data["details"])
        self.assertIn("views", response.data["details"])

    def test_nonexistent_article(self):
        """Test that non-existent article returns 404"""
        response = self.client.get(reverse("article-detail", kwargs={"id": 9999}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("error", response.data)
