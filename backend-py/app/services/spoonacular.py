import os
import httpx
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("SPOONACULAR_API_KEY")
BASE_URL = "https://api.spoonacular.com/recipes"

def get_recipes_by_ingredients(ingredients_list: list[str]):
    ingredients_string = ",".join(ingredients_list)
    url=f"{BASE_URL}/findByIngredients"

    params = {
        "ingredients": ingredients_string,
        "number": 3,
        "ignorePantry": True,
        "apiKey": API_KEY 
    } 

    with httpx.Client() as client:
        response = client.get(url, params=params)

    if response.status_code == 200:
        return response.json()

    return []

def get_recipe_details(recipe_id: int):
    url=f"{BASE_URL}/{recipe_id}/information"

    params = {
            "apiKey": API_KEY
            }

    with httpx.Client() as client:
        response = client.get(url, params=params)

    if response.status_code == 200:
        return response.json()

    return None
