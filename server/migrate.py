from database.conn import engine, SessionLocal, Base
from models.user import User
from services.utils.hash_password import hash_password  # Adicione isso

def migrate():
    print("Criando banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")
    
    with SessionLocal() as db:
        hashed_pw = hash_password("P@ssword1")
        user = User(name="teste", email="teste@gmail.com", password=hashed_pw)
        db.add(user)
        db.commit()
        print("[+] Usuário teste inserido com sucesso!")
        
if __name__ == "__main__":
    migrate()

print("[!] Migração concluída!")
