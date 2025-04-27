from database.conn import engine, SessionLocal, Base
from models.user import User

def migrate():
    print("Criando banco de dados...")
    Base.metadata.create_all(bind=engine) # Criação das tabelas, se não existirem
    print("Tabelas criadas com sucesso!")

    # Criando um usuário de teste
    with SessionLocal() as db:
        user = User(name="teste", email="teste@gmail.com", password="P@ssword1")
        db.add(user)
        db.commit()
        print("[+] Usuário teste inserido com sucesso!")
        
if __name__ == "__main__":
    migrate()

print("[!] Migração concluída!")
