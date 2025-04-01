REM Ativa a venv
call venv\Scripts\activate

REM Instala dependências do requirements.txt
echo Instalando dependências...
pip install -r req.txt

REM Inicia o servidor FastAPI
echo Iniciando servidor...
fastapi dev main.py
