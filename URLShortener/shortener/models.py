from django.db import models


class ShortURL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
# ┌─────────────────────────────────────────┐
# │ ShortURL                                │
# ├──────────────┬──────────────────────────┤
# │ id           │ 1                        │
# │ original_url │ https://example.com      │
# │ short_code   │ a7K2x                    │
# │ created_at   │ 2026-09-03 ...           │
# └──────────────┴──────────────────────────┘