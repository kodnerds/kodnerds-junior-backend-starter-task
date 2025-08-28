from django.db import models


class Article(models.Model):
    author = models.CharField(max_length=100)
    date = models.DateField()
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.URLField()
    views = models.PositiveIntegerField()
    likes = models.PositiveIntegerField()
    comments = models.PositiveIntegerField()
    readMore = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', '-id']

    def __str__(self):
        return self.title

