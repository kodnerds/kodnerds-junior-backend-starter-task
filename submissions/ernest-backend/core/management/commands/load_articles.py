import json

from django.core.management.base import BaseCommand

from core.models import Article


class Command(BaseCommand):
    help = "Load article data from JSON file"

    def add_arguments(self, parser):
        parser.add_argument(
            "file_path",
            type=str,
            help="Path to the JSON file",
        )

    def handle(self, *args, **kwargs):
        file_path = kwargs["file_path"]

        try:
            with open(file_path, "r") as file:
                articles_data = json.load(file)

            created_count = 0
            for article_data in articles_data:
                # Convert JSON field names to model field names
                article, created = Article.objects.get_or_create(
                    title=article_data["title"],
                    defaults={
                        "author": article_data["author"],
                        "date": article_data["date"],
                        "description": article_data["description"],
                        "image": article_data["image"],
                        "views": article_data[
                            "views"
                        ],
                        "likes": article_data["likes"],
                        "comments": article_data["comments"],
                        "read_more": article_data[
                            "readMore"
                        ],
                    },
                )
                if created:
                    created_count += 1

            self.stdout.write(
                self.style.SUCCESS(
                    f"Successfully loaded {created_count} new articles. "
                    f"Skipped {len(articles_data) - created_count} duplicates."
                )
            )

        except FileNotFoundError:
            self.stderr.write(self.style.ERROR(f"File not found: {file_path}"))
        except json.JSONDecodeError:
            self.stderr.write(self.style.ERROR("Invalid JSON file"))
        except KeyError as e:
            self.stderr.write(self.style.ERROR(f"Missing required field: {e}"))
