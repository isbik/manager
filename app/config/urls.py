from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/', include('board.urls')),
    
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/user/', include('users.urls', namespace="users")),
    path('api/auth/', include('google.urls', namespace="google")),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]
