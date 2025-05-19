from sqlalchemy.orm import Session
from models.usuario import Usuario
from pydantic import BaseModel
from schemas.user import UserCreate, UserLogin
from fastapi import HTTPException, Response
from fastapi.responses import JSONResponse
from services.utils.hash_password import hash_password, verify_password  
from dotenv import load_dotenv
import os
from services.utils.jwt import create_token, create_refresh_token, verify_refresh_token
import secrets

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")

def create_access_token(email: str) -> str:
    return create_token(email)

def register_user(user: UserCreate, db: Session, response: Response):
    if db.query(Usuario).filter(Usuario.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    hashed_password = hash_password(user.password)
    new_user = Usuario(
        nome_completo=user.username,
        email=user.email,
        senha=hashed_password,
        tipo_usuario='comum'
    )
    db.add(new_user)
    db.commit()

    # Gerar tokens
    access_token = create_token(user.email)
    refresh_token = create_refresh_token(user.email)

    # Salvar refresh token no banco
    new_user.refresh_token = refresh_token
    db.commit()

    # Configurar cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=3600,  # 1 hora para access token
        path="/"
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=432000,  # 5 dias para refresh token
        path="/"
    )

    return {"message": "Usuário cadastrado com sucesso"}

def login_user(user: UserLogin, db: Session, response: Response):
    db_user = db.query(Usuario).filter(Usuario.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    # Gerar tokens
    access_token = create_token(user.email)
    refresh_token = create_refresh_token(user.email)

    # Atualizar refresh token no banco
    db_user.refresh_token = refresh_token
    db.commit()

    # Configurar cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=3600,  # 1 hora para access token
        path="/"
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="Lax",
        max_age=432000,  # 5 dias para refresh token
        path="/"
    )

    return {"message": "Login realizado com sucesso"}

def refresh_access_token(refresh_token: str, db: Session, response: Response):
    try:
        # Verificar se o refresh token é válido
        email = verify_refresh_token(refresh_token)
        if not email:
            raise HTTPException(status_code=401, detail="Refresh token inválido")

        # Verificar se o refresh token está no banco
        user = db.query(Usuario).filter(Usuario.email == email, Usuario.refresh_token == refresh_token).first()
        if not user:
            raise HTTPException(status_code=401, detail="Refresh token inválido")

        # Gerar novo access token
        new_access_token = create_token(email)

        # Atualizar cookie
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            secure=True,
            samesite="Lax",
            max_age=3600,  # 1 hora
            path="/"
        )

        return {"message": "Token atualizado com sucesso"}

    except Exception as e:
        raise HTTPException(status_code=401, detail="Erro ao atualizar token")

def logout_user(response: Response, db: Session, email: str):
    # Limpar refresh token do banco
    user = db.query(Usuario).filter(Usuario.email == email).first()
    if user:
        user.refresh_token = None
        db.commit()

    # Limpar cookies
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")

    return {"message": "Logout realizado com sucesso"}
