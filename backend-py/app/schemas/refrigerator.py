from pydantic import BaseModel, Field, ConfigDict
from decimal import Decimal

class IngredientCreate(BaseModel):

    ingredient: str = Field(alias="ingredientName", min_length=1)
    quantity: Decimal = Field(gt=0)
    unit_measurement: str = Field(alias="unitMeasurement", min_length=1)
    
    model_config = ConfigDict(populate_by_name=True)

class IngredientResponse(IngredientCreate):
    id: int
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
