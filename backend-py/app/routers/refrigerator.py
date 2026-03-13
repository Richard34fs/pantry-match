from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import RefrigeratorItem, User
from app.schemas import IngredientCreate, IngredientResponse

router = APIRouter(prefix="/geladeira", tags=["Refrigerator"])

@router.post("/", response_model=IngredientResponse, status_code=201)
def add_ingredient(item_data: IngredientCreate, db: Session = Depends(get_db)):
    
    user_exists = db.query(User).filter(User.id == item_data.user_id).first()
    if not user_exists:
        raise HTTPException(status_code=404, detail="User not found in database")

    db_item = RefrigeratorItem(**item_data.model_dump())
    
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    
    return db_item
