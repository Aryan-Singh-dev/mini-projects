from django.http import JsonResponse
from django.shortcuts import render


def create_user(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": "Only Post requests allowed"},
            status=400
        )
        
    try:
        user=validate_user(request.body)
    except 