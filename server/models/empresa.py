from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.conn import Base

class Empresa(Base):
    __tablename__ = "empresas"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    nome_empresa = Column(String(255))
    cnpj = Column(String(18))
    endereco = Column(String(255))

    usuario = relationship("Usuario", back_populates="empresas") 