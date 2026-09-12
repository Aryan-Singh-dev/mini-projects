from django.contrib import admin
from django.urls import include, path

# which app should handle what?
urlpatterns = [
    path("admin/", admin.site.urls),
    
    path("api/", include("shortener.urls")), 
    path("", include("shortener.urls")),
]