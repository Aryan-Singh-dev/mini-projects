import json

from django.core.exceptions import ValidationError
from django.core.validators import URLValidator


def validate_url_request(body):
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON")

    if "url" not in data:
        raise ValueError("url is required")

    url = data["url"]

    if not isinstance(url, str):
        raise ValueError("url must be a string")

    validator = URLValidator()

    try:
        validator(url)
    except ValidationError:
        raise ValueError("Invalid URL")

    return url