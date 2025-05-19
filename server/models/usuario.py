from sqlalchemy import Column, Integer, String, Date, Enum, TIMESTAMP
from sqlalchemy.orm import relationship
from database.conn import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    senha = Column(String(255), nullable=False)
    nome_completo = Column(String(255))
    cpf = Column(String(14))
    data_nascimento = Column(Date)
    telefone = Column(String(15))
    tipo_usuario = Column(Enum("admin", "comum", name="tipo_usuario_enum"))
    data_criacao = Column(TIMESTAMP)
    imagem = Column(String(255))
    refresh_token = Column(String(255))

    empresas = relationship("Empresa", back_populates="usuario")
    relatorios = relationship("Relatorio", back_populates="usuario")
    agendamentos = relationship("Agendamento", back_populates="usuario")
    logins_google = relationship("LoginGoogle", back_populates="usuario") 