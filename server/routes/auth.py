from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.user import User
from services.auth_service import register_user, login_user
from schemas.user import UserCreate, UserLogin
from schemas.target_request import TargetRequest
from services.dalfox import Dalfox
from schemas.target_request import TargetRequest

router = APIRouter()
    
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user, db)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(user, db)

@router.get("/users/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()  # Consulta um usuário pelo ID
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")  # Se não encontrar o usuário, retorna erro 404
    return user


