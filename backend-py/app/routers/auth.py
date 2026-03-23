from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.config import get_db
from app.crud import user as crud_user
from app.core import security

router = APIRouter(tags=["Login"])

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, email=form_data.username)
    if not user:
        raise   HTTPException(status_code=401, detail="Invalid Email or Password")

    valid_password = security.verify_password(form_data.password, user.password_hash)
    if not valid_password :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Email or Password")

    access_token = security.create_access_token(data={"sub": user.email})
        
    return {"access_token": access_token, "token_type":"bearer"}
