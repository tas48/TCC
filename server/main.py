from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.tools.dalfox import router as tools_router
from routes.tools.nmap import router as nmap_router  
from middleware.cors import setup_cors
from migrate import migrate

app = FastAPI()
setup_cors(app)
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(tools_router, prefix="/tools", tags=["Dalfox"])
app.include_router(nmap_router, prefix="/tools", tags=["Nmap"])


