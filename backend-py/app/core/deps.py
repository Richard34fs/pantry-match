from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import jwt
from app.database.config import get_db
from app.core import security
from app.crud import user as crud_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="The credentials could not be validated", headers={"WWW-Authenticate" : "Bearer"},)

    try:
        payload = jwt.decode(token, security.KEY, algorithms=[security.ALGORITHM])
        
        email: str = payload.get("sub")
        if not email:
            raise credentials_exception

    except jwt.PyJWTError:
        raise credentials_exception

    user = crud_user.get_user_by_email(db, email=email)
    if not user:
        raise credentials_exception

    return user
