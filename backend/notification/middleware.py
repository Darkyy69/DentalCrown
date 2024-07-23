import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from channels.middleware import BaseMiddleware
from asgiref.sync import sync_to_async
from urllib.parse import parse_qs
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

@sync_to_async
def get_user(user_id):
    try:
        user = get_user_model().objects.get(id=user_id)
        return user
    except get_user_model().DoesNotExist:
        return None

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = scope['query_string'].decode()
        query_params = parse_qs(query_string)
        token = query_params.get('token', [None])[0]
        if token:
            try:
                UntypedToken(token)  # Validate the token
                decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_data.get('user_id')
                scope['user'] = await get_user(user_id)
            except (InvalidToken, TokenError, jwt.DecodeError):
                scope['user'] = None
        else:
            scope['user'] = None

        return await super().__call__(scope, receive, send)
