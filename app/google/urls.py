from django.contrib import admin
from django.urls import path

from .views import GoogleAuthLink, GoogleView

app_name="googleauth"

urlpatterns = [
    path('google/', GoogleView.as_view(), name='google'),  
    path('google/link/', GoogleAuthLink.as_view(), name='google'),  
]


