from sqlalchemy import Column, Integer, Enum, Text, ForeignKey
from sqlalchemy.orm import relationship
from database.conn import Base

class ConfiguracaoScan(Base):
    __tablename__ = "configuracoes_scans"

    id = Column(Integer, primary_key=True, index=True)
    agendamento_id = Column(Integer, ForeignKey("agendamentos.id"))
    ferramenta = Column(Enum("ferramenta1", "ferramenta2", name="ferramenta_enum"))
    parametros = Column(Text)

    agendamento = relationship("Agendamento", back_populates="configuracoes") 