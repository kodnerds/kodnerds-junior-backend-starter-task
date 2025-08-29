from django.test import TestCase

from core.models import Article


class ArticleModelTest(TestCase):
    def test_create_article(self):
        article = Article.objects.create(
            title="Test Article",
            author="Test Author",
            date="25 May, 2024",
            description="Test description",
            image="https://example.com/image.jpg",
            views=10,
            likes=5,
            comments=2,
        )
        self.assertEqual(article.title, "Test Article")
        self.assertEqual(article.views, 10)
