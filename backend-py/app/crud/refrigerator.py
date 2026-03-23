from sqlalchemy.orm import Session
from app.models.refrigerator import RefrigeratorItem
from app.schemas.refrigerator import IngredientCreate

def get_all_ingredients(db: Session, user_id: int):
    return db.query(RefrigeratorItem).filter(RefrigeratorItem.user_id == user_id).all()

def get_ingredient_by_id(db:Session, item_id: int):
    return db.query(RefrigeratorItem).filter(RefrigeratorItem.id == item_id).first()

def create_ingredient(db:Session, ingredient:IngredientCreate, user_id: int):
    item_data = ingredient.model_dump()
    item_data["user_id"] = user_id
    new_item = RefrigeratorItem(**item_data)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

def delete_ingredient(db:Session, item_id: int, user_id: int):
    item = db.query(RefrigeratorItem).filter(RefrigeratorItem.id == item_id).filter(RefrigeratorItem.user_id == user_id).first()
    if item:
        db.delete(item)
        db.commit()
    return item

def update_ingredient(db:Session, item_id: int, ingredient: IngredientCreate, user_id: int):
    item = db.query(RefrigeratorItem).filter(RefrigeratorItem.id == item_id).filter(RefrigeratorItem.user_id == user_id).first()
    if item:
        update_data = ingredient.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(item, key, value)

        db.commit()
        db.refresh(item)
    return item
