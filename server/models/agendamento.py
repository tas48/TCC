from sqlalchemy import Column, Integer, String, Text, Enum, TIMESTAMP, DATETIME, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship
from database.conn import Base

class Agendamento(Base):
    __tablename__ = "agendamentos"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    nome_agendamento = Column(String(255))
    descricao = Column(Text)
    periodicidade = Column(Enum("diario", "semanal", "mensal", name="periodicidade_enum"))
    intervalo_personalizado = Column(Integer)
    data_inicio = Column(DATETIME)
    ativo = Column(SmallInteger)
    data_criacao = Column(TIMESTAMP)

    usuario = relationship("Usuario", back_populates="agendamentos")
    configuracoes = relationship("ConfiguracaoScan", back_populates="agendamento")
    logs = relationship("LogScan", back_populates="agendamento") 