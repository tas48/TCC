from datetime import datetime, timedelta
import jwt
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
REFRESH_SECRET_KEY = os.getenv("JWT_REFRESH_SECRET_KEY", SECRET_KEY + "_refresh")

def create_token(email: str) -> str:
    """Cria um access token JWT que expira em 1 hora"""
    expiration = datetime.utcnow() + timedelta(hours=1)
    payload = {
        "sub": email,
        "exp": expiration,
        "type": "access"
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def create_refresh_token(email: str) -> str:
    """Cria um refresh token JWT que expira em 5 dias"""
    expiration = datetime.utcnow() + timedelta(days=5)
    payload = {
        "sub": email,
        "exp": expiration,
        "type": "refresh"
    }
    return jwt.encode(payload, REFRESH_SECRET_KEY, algorithm="HS256")

def verify_token(token: str) -> str:
    """Verifica um access token e retorna o email"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        if payload["type"] != "access":
            return None
        return payload["sub"]
    except:
        return None

def verify_refresh_token(token: str) -> str:
    """Verifica um refresh token e retorna o email"""
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=["HS256"])
        if payload["type"] != "refresh":
            return None
        return payload["sub"]
    except:
        return None
