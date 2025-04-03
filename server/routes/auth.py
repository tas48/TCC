from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import jwt
import datetime
from conn import SECRET_KEY
from models import User
from database import get_db

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str

def create_token(email: str) -> str:
    payload = {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Usuário já cadastrado")

    new_user = User(name="Novo Usuário", email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    return {"message": "Usuário cadastrado com sucesso"}

@router.post("/login")
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return {"token": create_token(user.email)}
