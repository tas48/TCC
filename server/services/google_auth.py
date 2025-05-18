import requests
from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.usuario import Usuario
from models.login_google import LoginGoogle

def get_google_user_info(token: str):
    response = requests.get(
        f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}'
    )
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Token Google inválido")
    return response.json()

def google_authenticate(token: str, db: Session):
    google_data = get_google_user_info(token)
    google_id = google_data['sub']
    email = google_data['email']
    nome = google_data.get('name')
    imagem = google_data.get('picture')

    usuario = db.query(Usuario).filter_by(email=email).first()
    if not usuario:
        usuario = Usuario(
            email=email,
            senha='',  # Usuário Google não tem senha
            nome_completo=nome,
            imagem=imagem,
            tipo_usuario='comum'
        )
        db.add(usuario)
        db.commit()
        db.refresh(usuario)

    login_google = db.query(LoginGoogle).filter_by(google_id=google_id).first()
    if not login_google:
        login_google = LoginGoogle(
            usuario_id=usuario.id,
            google_id=google_id
        )
        db.add(login_google)
        db.commit()

    return usuario 