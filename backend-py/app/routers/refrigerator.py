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

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_a_ingredient(item_id: int, db: Session = Depends(get_db)):
    deleted_item = crud_refrigerator.delete_ingredient(db, item_id)
    
    if not deleted_item:
        raise HTTPException(status_code=404, detail="Ingrediente não encontrado na geladeira.")
    return None

@router.put("/{item_id}", response_model=IngredientResponse)
def update_a_ingredient(item_id: int, ingredient: IngredientCreate, db: Session = Depends(get_db)):
    updated_item = crud_refrigerator.update_ingredient(db, item_id, ingredient)
    
    if not updated_item:
        raise HTTPException(status_code=404, detail="Ingrediente não encontrado na geladeira.")
    return updated_item
