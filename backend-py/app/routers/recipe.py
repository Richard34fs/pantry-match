from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.config import get_db
from app.core.deps import get_current_user
from app.crud import refrigerator as crud_refrigerator
from app.services import spoonacular

router = APIRouter(prefix="/receitas", tags=["Recipes"])

@router.get("/sugerir")
def suggest_recipes(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    ingredients = crud_refrigerator.get_all_ingredients(db, user_id=current_user.id)

    if len(ingredients) == 0:
        raise HTTPException(status_code=404, detail="empty fridge" )

    ingredients_name = [item.ingredient for item in ingredients]

    return spoonacular.get_recipes_by_ingredients(ingredients_name)

@router.get("/{recipe_id}")
def get_recipe_steps( recipe_id: int, current_user = Depends(get_current_user)):
    recipe_details = spoonacular.get_recipe_details(recipe_id)

    if not recipe_details:
        raise HTTPException(status_code=404, detail="Recipe not found.")
    return recipe_details
