const axios = require('axios');

const getRecipesByIngredients = async (ingredients) => {
  try {
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${process.env.SPOONACULAR_API_KEY}`;
    
    const response = await axios.get(url);

    return response.data; 

  } catch (error) {
      console.error("Spoonacular API Error:", error.message);
      throw new Error("Failed to fetch recipes from external API");
  }
};

const getRecipeDetails = async(recipeId) => {
  try {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const response = await axios.get(url);

    return response.data;

  } catch (error) {
      console.error("Spoonacular API Error:", error.message);
      throw new Error("Failed to fetch recipes details from external API");
  };
};

module.exports = { getRecipesByIngredients, getRecipeDetails };
