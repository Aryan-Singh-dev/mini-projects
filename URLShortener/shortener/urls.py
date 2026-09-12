from django.urls import path
from . import views #the dot replaces the 'shortener' which is the current directory name

#Okay, this request belongs to the shortener app. Which view inside the shortener app should handle it?
urlpatterns = [
    path("urls/", views.create_url),
    path(
        "<str:short_code>/",
        views.redirect_url,
        name="redirect_url" #even if we change the api endpoint to something else, we don't need to change it evrywhere in the code, we can just write the name. sort of like to remove update anomaly?
    ),
]

