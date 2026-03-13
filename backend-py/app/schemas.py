from pydantic import BaseModel, Field

class IngredientCreate(BaseModel):
    user_id: int
    ingredient_name: str = Field(..., min_length=1, description="Ingredient name cannot be empty")
    quantity: float = Field(..., gt=0, description="Quantity must be greater than zero")
    unit_measurement: str = Field(..., min_length=1)

class IngredientResponse(IngredientCreate):
    id: int
    class Config:
        from_attributes = True
