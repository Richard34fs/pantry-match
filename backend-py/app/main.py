from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.routers import refrigerator
import secure

app = FastAPI()

secure_headers = secure.Secure.with_default_headers()

@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.set_headers(response)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(refrigerator.router)

@app.get("/")
def read_root():
    return {"message": "API is runnig"}
