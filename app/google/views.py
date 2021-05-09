import requests
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from users.models import NewUser, UserManager

CLIENT_ID = '956525159314-s7l215aki3ibkaacskfuhnk14r55hcqo.apps.googleusercontent.com'
CLIENT_SECRET = 'KrJUZ3CY4_1qCINJyHNVQPi_'
SCOPE = 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
REDIRECT_URI = 'http://127.0.0.1:8000/auth/google'
REDIRECT_URI_CLIENT = 'http://127.0.0.1:3030/auth'


class GoogleAuthLink(APIView):
    def get(self):
      link = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&response_type=code&"
      link += 'redirect_uri=' + REDIRECT_URI_CLIENT +'&'
      link += 'client_id=' + CLIENT_ID +'&'
      link += 'scope=' + SCOPE +'&'
      return Response({ 'link':link })

class GoogleView(APIView):
  def get(self, request):
    code = request.query_params.get('code')
    payload = {
        'code'         : code,
        'client_id'    : CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri' : REDIRECT_URI_CLIENT,
        'scope'        : SCOPE,
        'grant_type'   : 'authorization_code',
    }
    print(payload)
    r = requests.post('https://oauth2.googleapis.com/token', params=payload)
    data = json.loads(r.text)
    print(data)
    if 'error' in data:
        content = {'message': 'wrong google token / this google token is already expired.'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    user_data = {}
    if 'access_token' in data:
        payload = {'access_token' : data['access_token']}
        r = requests.get('https://openidconnect.googleapis.com/v1/userinfo', params=payload)
        user_data = json.loads(r.text)

    try:
        user = NewUser.objects.get(email=user_data['email'])
    except NewUser.DoesNotExist:
        user = NewUser()
        user.password = make_password(UserManager().make_random_password())
        user.email = user_data['email']
        user.save()

    token = RefreshToken.for_user(user)  # generate token without username & password
    response = {}
    response['access_token'] = str(token.access_token)
    response['refresh_token'] = str(token)
    return Response(response)

