@echo off

REM Instala dependências do requirements.txt
echo [+]Instalando dependencias...
pip install -r req.txt

REM Realiza migrações do banco de dados
echo [+]Realizando migrations e instalando usuario de teste no banco de dados sqlite... 
python migrate.py

REM Inicia o servidor FastAPI
echo [!]Iniciando servidor...
fastapi dev main.py
