from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import jwt
import datetime
from typing import Dict

app = FastAPI()

SECRET_KEY = "secret"
fake_db: Dict[str, str] = {}

class User(BaseModel):
    email: str
    password: str

def create_token(email: str) -> str:
    payload = {
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

@app.post("/register")
def register(user: User):
    if user.email in fake_db:
        raise HTTPException(status_code=400, detail="Usuário já cadastrado")
    fake_db[user.email] = user.password
    return {"message": "Usuário cadastrado com sucesso"}

@app.post("/login")
def login(user: User):
    if fake_db.get(user.email) != user.password:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    token = create_token(user.email)
    return {"message": "Login bem-sucedido", "token": token}
