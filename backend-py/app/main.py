from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import user
from app.routers import refrigerator
from app import models

app = FastAPI(title="Pantry Match API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],# change to frontend domain when get in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API is online and running"}

app.include_router(refrigerator.router)
app.include_router(user.router)
