import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from database.conn import DATABASE_URL

def migrate():
    print("Adicionando coluna refresh_token...")
    engine = create_engine(DATABASE_URL)
    
    with engine.connect() as conn:
        # Adiciona a coluna refresh_token
        conn.execute(text("""
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS refresh_token VARCHAR
        """))
        conn.commit()
    
    print("Coluna refresh_token adicionada com sucesso!")

if __name__ == "__main__":
    migrate() 