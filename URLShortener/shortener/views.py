from django.http import JsonResponse
from django.shortcuts import redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse

from .validators import validate_url_request
from .services import create_short_url
from .models import ShortURL



@csrf_exempt
def create_url(request):

    # to keep this strictly for post request
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST requests are allowed"},
            status=405
        )

    try:
        url = validate_url_request(request.body)
    except ValueError as error:
        return JsonResponse(
            {"error": str(error)},
            status=400
        )
    
    short_url_obj = create_short_url(url)

    short_url_path = reverse(
        "redirect_url",
        kwargs={"short_code": short_url_obj.short_code}
    )

    short_url = request.build_absolute_uri(short_url_path)

    return JsonResponse({
        "original_url": short_url_obj.original_url,
        "short_code": short_url_obj.short_code,
        "short_url": short_url
    })

def redirect_url(request, short_code):

    short_url = get_object_or_404(
        ShortURL,
        short_code=short_code
    )

    return redirect(short_url.original_url)
    