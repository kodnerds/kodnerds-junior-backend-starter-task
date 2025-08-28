from django.core.management.base import BaseCommand
from articles.models import Article

class Command(BaseCommand):
    help = "Drop all Article data"

    def add_arguments(self, parser):
        parser.add_argument(
            '--file',
            type=str,
            help="(Optional) Path to file, ignored in drop_data"
        )

    def handle(self, *args, **kwargs):
        Article.objects.all().delete()
        self.stdout.write(self.style.SUCCESS("All Article data has been deleted."))
