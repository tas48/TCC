from sqlalchemy.orm import Session
import jwt
import datetime
from models.user import User
from pydantic import BaseModel
from schemas.user import UserCreate, UserLogin
from fastapi import HTTPException
from services.utils.hash_password import hash_password, verify_password  
from dotenv import load_dotenv
import os
from services.utils.jwt import create_token

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")

def register_user(user: UserCreate, db: Session):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    hashed_password = hash_password(user.password)  
    new_user = User(name=user.username, email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()

    return {"message": "Usuário cadastrado com sucesso", "token": create_token(user.email)}

def login_user(user: UserLogin, db: Session):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password): 
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return {"token": create_token(user.email)}
