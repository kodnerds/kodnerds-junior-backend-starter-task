import json
import re
from pathlib import Path
from django.core.management.base import BaseCommand, CommandError
from articles.models import Article
from datetime import datetime


class Command(BaseCommand):
    help = 'Load JSON data into the Article model'

    def add_arguments(self, parser):
        parser.add_argument('--file', type=str, default=str(Path(__file__).resolve().parents[3] / 'data' / 'clean_data.json'))

    def handle(self, *args, **options):
        file_path = Path(options['file'])
        if not file_path.exists():
            raise CommandError(f'File not found: {file_path}')

        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError as e:
                raise CommandError(f'Invalid JSON: {e}')

        created, updated = 0, 0
        for item in data:
            # Parse date format like "23 May, 2024"
            date_value = item.get('date')
            if isinstance(date_value, str):
                try:
                    date_value = datetime.strptime(date_value, '%d %B, %Y').date()
                except ValueError:
                    # Fallback: attempt ISO parse
                    try:
                        date_value = datetime.fromisoformat(date_value).date()
                    except Exception:
                        raise CommandError(f"Unrecognized date format: {date_value}")

            defaults = {
                'author': item.get('author', ''),
                'date': date_value,
                'title': item.get('title', ''),
                'description': item.get('description', ''),
                'image': item.get('image', ''),
                'views': int(item.get('views', 0)),
                'likes': int(item.get('likes', 0)),
                'comments': int(item.get('comments', 0)),
                'readMore': item.get('readMore', ''),
            }

            obj, created_flag = Article.objects.update_or_create(
                id=item.get('id'),
                defaults=defaults
            )
            if created_flag:
                created += 1
            else:
                updated += 1

        self.stdout.write(self.style.SUCCESS(f'Loaded data: created={created}, updated={updated}'))

