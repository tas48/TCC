from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database.conn import Base

class LoginGoogle(Base):
    __tablename__ = "logins_google"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    google_id = Column(String(255), unique=True)

    usuario = relationship("Usuario", back_populates="logins_google") 