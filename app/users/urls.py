from django.urls import path

from .views import BlacklistTokenUpdateView, User

app_name = 'users'

urlpatterns = [
    path('user/', User.as_view()),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
