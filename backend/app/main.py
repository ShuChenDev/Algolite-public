from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import threading

from app.broker.IBClient import client
from app.api import ib, db, logs

@asynccontextmanager
async def lifespan(app: FastAPI):
    thread = threading.Thread(target=client.run, daemon=True)
    thread.start()
    yield
    client.disconnect()

app = FastAPI(title="Algolite Server", version="1.0", lifespan=lifespan)

# CORS
origins = [
    "http://localhost:3000",          
    "https://algolite-seven.vercel.com"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://algolite-seven.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Routers
app.include_router(ib.router, prefix="/broker", tags=["Broker"])
app.include_router(db.router, prefix="/database", tags=["Database"])
app.include_router(logs.router)