import json

from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_url(request):

    try:
        data = json.loads(request.body)
        
    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )

    if "url" not in data:
        return JsonResponse(
            {"error": "url is required"},
            status=400
        )

    # return JsonResponse({
    #     "url": data["url"]
    # })
    
    url= data["url"]
    validator = URLValidator() #creates a Django validator specifically designed to check whether something looks like a valid URL.
    
    # our current validator is implicitly catching the wrong type too. But it's better to make our intentions explicit. so we add, 
    if not isinstance(url, str):
        return JsonResponse(
            {"error": "url must be a string"},
            status=400
    )
    
    try:
        validator(url) #"Django, is this value a valid URL?"
    except ValidationError:
        return JsonResponse(
            {"error": "Invalid URL"},
            status=400
        )
        
    return JsonResponse({
        "url": url
    })
    
    
def stupid(request):
    return JsonResponse({
        "message": "This is a stupid api"
    })