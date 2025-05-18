from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from database.conn import Base

class Relatorio(Base):
    __tablename__ = "relatorios"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    nome_relatorio = Column(String(255))
    descricao = Column(Text)
    data_criacao = Column(TIMESTAMP)
    caminho_arquivo = Column(String(255))

    usuario = relationship("Usuario", back_populates="relatorios") 