from sqlalchemy import Column, Integer, Text, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database.conn import Base

class LogScan(Base):
    __tablename__ = "logs_scans"

    id = Column(Integer, primary_key=True, index=True)
    agendamento_id = Column(Integer, ForeignKey("agendamentos.id"))
    data_execucao = Column(DateTime)
    status = Column(Enum("pendente", "executado", "erro", name="status_enum"))
    log = Column(Text)

    agendamento = relationship("Agendamento", back_populates="logs") 