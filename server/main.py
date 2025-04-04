from fastapi import FastAPI
from routes.auth import router as auth_router
from middleware.cors import setup_cors

app = FastAPI()
setup_cors(app)
app.include_router(auth_router, prefix="/auth")

