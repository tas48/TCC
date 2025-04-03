from sqlalchemy.orm import Session
import jwt
import datetime
from database.conn import SECRET_KEY
from models.user import User
from pydantic import BaseModel
from fastapi import HTTPException
from services.utils.hash_password import hash_password, verify_password  

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    
class UserLogin(BaseModel):  
    email: str  
    password: str 

def create_token(email: str) -> str:
    payload = {"email": email, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

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
    if not db_user or not verify_password(user.password, db_user.password):  # 🔑 Verificando hash
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return {"token": create_token(user.email)}
