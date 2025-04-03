from database.conn import engine, SessionLocal, Base
from models.user import User

def migrate():
    print("Criando banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Banco de dados criado!")

    # Criando um usuário de teste
    db = SessionLocal()
    try:
        user = User(name="teste", email="teste@gmail.com", password="P@ssword1")
        db.add(user)
        db.commit()
        print("[+]Usuário teste inserido!")
    finally:
        db.close()

if __name__ == "__main__":
    migrate()
print("[!]Migração concluída!")