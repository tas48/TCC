from sqlalchemy import Column, Integer, String, LargeBinary
from database.conn import Base

class Report(Base):
    __tablename__ = "report"

    id = Column(Integer, primary_key=True, index=True)
    bson = Column(LargeBinary, index=True, nullable=False)  # Aqui salvamos o JSON como binário
    email = Column(String, unique=True, index=True)
    password = Column(String)
