require('dotenv').config();
const axios = require('axios');

const getRecipesByIngredients = async (ingredients) => {
  
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients',{
      paramns: {
        ingredients: ingredients,
        number: 5,
        ranking: 1,
        ignorePantry: true
      },
      headers: {
        'x-api-key': process.env.SPOONACULAR_API_KEY 
      }
    });

    return response.data

  } catch (error) {
    console.error("Spoonacular API Error:", error.message);
    throw new Error("Failed to fetch recipes from external API");

  }
};

module.exports = { getRecipesByIngredients };
