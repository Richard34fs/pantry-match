const { getIngredientsFromDB } = require("../modals/refrigeratorModal.js");
const { getRecipesByIngredients } = require("../services/spoonacularService.js");

const getRecipes = async(req, res) =>{
  try {
    const rawIngredients = await getIngredientsFromDB();
    const ingredientsString = rawIngredients.map((item) => item.ingredient).join(',');
    const recipes = await getRecipesByIngredients(ingredientsString);
    res.status(200).json(recipes);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch recipes" });
  };
};

module.exports = { getRecipes };
