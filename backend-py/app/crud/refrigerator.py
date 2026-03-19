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

def delete_ingredient(db:Session, item_id: int):
    item = db.query(RefrigeratorItem).filter(RefrigeratorItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def update_ingredient(db:Session, item_id: int, ingredient: IngredientCreate):
    item = db.query(RefrigeratorItem).filter(RefrigeratorItem.id == item_id).first()
    if item:
        update_data = ingredient.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(item, key, value)

        db.commit()
        db.refresh(item)
    return item
