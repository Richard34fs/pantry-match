from sqlalchemy.orm import Session
from app.models.refrigerator import RefrigeratorItem
from app.schemas.refrigerator import IngredientCreate

def get_all_ingredients(db: Session):
    return db.query(RefrigeratorItem).all()

def get_ingredient_by_id(db:Session, item_id: int):
    return db.query(RefrigeratorItem).filter(RefrigeratorItem.id == item_id).first()

def create_ingredient(db:Session, ingredient:IngredientCreate):
    new_item = RefrigeratorItem(**ingredient.model_dump())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item
