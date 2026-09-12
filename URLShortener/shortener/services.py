import random
import string

from django.db import IntegrityError
from .models import ShortURL


def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits

    return "".join(
        random.choice(characters)
        for _ in range(length)
    )


def create_short_url(url):
    while True:
        short_code = generate_short_code()

        try:
            return ShortURL.objects.create(
                original_url=url,
                short_code=short_code
            )

        except IntegrityError:
            continue