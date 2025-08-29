from django.core.validators import MinValueValidator
from django.db import models


class Article(models.Model):
    author = models.CharField(max_length=250)
    date = models.CharField(max_length=20)
    title = models.CharField(max_length=250, unique=True)
    description = models.TextField()
    image = models.URLField(max_length=300)
    views = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    comments = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    likes = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    read_more = models.CharField(max_length=100, default="#", blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', 'created_at']  # Added for descending

    def __str__(self):
        return self.title
