from database.conn import engine, SessionLocal, Base
from models.usuario import Usuario
from models.empresa import Empresa
from models.relatorio import Relatorio
from models.login_google import LoginGoogle
from models.log_scan import LogScan
from models.configuracao_scan import ConfiguracaoScan
from models.agendamento import Agendamento
from services.utils.hash_password import hash_password

def migrate():
    print("Criando banco de dados...")
    Base.metadata.create_all(bind=engine)
    print("Tabelas criadas com sucesso!")
    
    with SessionLocal() as db:
        hashed_pw = hash_password("P@ssword1")
        usuario = Usuario(
            email="teste@gmail.com",
            senha=hashed_pw,
            nome_completo="Usuário Teste"
        )
        db.add(usuario)
        db.commit()
        print("[+] Usuário teste inserido com sucesso!")
        
if __name__ == "__main__":
    migrate()

print("[!] Migração concluída!")
