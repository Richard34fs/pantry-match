from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.config import get_db
from app.schemas.refrigerator import IngredientCreate, IngredientResponse
from app.crud import refrigerator as crud_refrigerator

router = APIRouter(prefix="/geladeira", tags=["Refrigerator"])

@router.get("/", response_model=list[IngredientResponse])
def read_all_ingredients(db: Session = Depends(get_db)):
    return crud_refrigerator.get_all_ingredients(db)

@router.post("/", response_model=IngredientResponse, status_code=status.HTTP_201_CREATED)
def create_new_ingredient(ingredient: IngredientCreate, db: Session = Depends(get_db)):
    return crud_refrigerator.create_ingredient(db, ingredient)
