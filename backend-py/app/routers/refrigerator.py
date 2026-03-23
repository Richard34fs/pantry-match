from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.config import get_db
from app.schemas.refrigerator import IngredientCreate, IngredientResponse
from app.crud import refrigerator as crud_refrigerator
from app.core.deps import get_current_user

router = APIRouter(prefix="/geladeira", tags=["Refrigerator"])

@router.get("/", response_model=list[IngredientResponse])
def read_all_ingredients(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud_refrigerator.get_all_ingredients(db, user_id=current_user.id)

@router.post("/", response_model=IngredientResponse, status_code=status.HTTP_201_CREATED)
def create_new_ingredient(ingredient: IngredientCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud_refrigerator.create_ingredient(db, ingredient, user_id=current_user.id)

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_a_ingredient(item_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    deleted_item = crud_refrigerator.delete_ingredient(db, item_id, user_id=current_user.id)
    
    if not deleted_item:
        raise HTTPException(status_code=404, detail="Ingredient not founded.")
    return None

@router.put("/{item_id}", response_model=IngredientResponse)
def update_a_ingredient(item_id: int, ingredient: IngredientCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    updated_item = crud_refrigerator.update_ingredient(db, item_id, ingredient, user_id=current_user.id)
    
    if not updated_item:
        raise HTTPException(status_code=404, detail="Ingredient not founded.")
    return updated_item
