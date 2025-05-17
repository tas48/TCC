from sqlalchemy import Column, Integer, String
from database.conn import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    refresh_token = Column(String, nullable=True)
    