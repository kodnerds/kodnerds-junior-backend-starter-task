from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
# from .models import Article
from articles.models import Article




class ArticleAPITests(APITestCase):
    def setUp(self):
        Article.objects.create(
            author='Faaruq Azeez',
            date='2024-05-23',
            title='Sample',
            description='Desc',
            image='https://example.com/img.png',
            views=1,
            likes=2,
            comments=3,
            readMore='https://example.com'
        )

    def test_list_paginated(self):
        url = '/api/articles/'
        res = self.client.get(url, {'limit': 1, 'offset': 0})
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn('results', res.data)
        self.assertEqual(len(res.data['results']), 1)

    def test_create_article(self):
        url = '/api/articles/'
        payload = {
            'author': 'Tester',
            'date': '23 May, 2024',
            'title': 'New',
            'description': 'More desc',
            'image': 'https://example.com/img2.png',
            'views': 0,
            'likes': 0,
            'comments': 0,
            'readMore': 'https://example.com/read'
        }
        res = self.client.post(url, payload, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Article.objects.count(), 2)

