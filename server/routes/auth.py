from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
from sqlalchemy.orm import Session
from database.database import get_db
from models.usuario import Usuario
from services.google_auth import google_authenticate
from services.auth_service import register_user, login_user, refresh_access_token, logout_user, create_access_token
from schemas.user import UserCreate, UserLogin
from schemas.target_request import TargetRequest
from services.tools.dalfox import Dalfox
from services.utils.jwt import verify_token
from schemas.google_credential import GoogleCredential

router = APIRouter()
    
@router.post("/register")
def register(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    return register_user(user, db, response)

@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    return login_user(user, db, response)

@router.post("/refresh")
def refresh(response: Response, refresh_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token não encontrado")
    return refresh_access_token(refresh_token, db, response)

@router.post("/logout")
def logout(response: Response, access_token: str = Cookie(None), db: Session = Depends(get_db)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Não autorizado")
    
    email = verify_token(access_token)
    if not email:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    return logout_user(response, db, email)

@router.get("/users/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user


@router.post("/google/register")
def auth_google(data: GoogleCredential, response: Response, db: Session = Depends(get_db)):
    usuario = google_authenticate(data.credential, db)
    access_token = create_access_token(usuario.email)
    response.set_cookie(key="access_token", value=access_token, httponly=True)
    return {"access_token": access_token, "user_id": usuario.id}



