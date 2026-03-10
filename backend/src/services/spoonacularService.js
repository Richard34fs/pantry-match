const axios = require('axios');

const getRecipesByIngredients = async (ingredients) => {
  try {
    // 1. Montamos a URL crua e exata, do mesmo jeito que funcionou no navegador!
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${process.env.SPOONACULAR_API_KEY}`;
    
    // 2. Passamos a URL pronta pro Axios, sem usar o objeto 'params'
    const response = await axios.get(url);

    return response.data; 

  } catch (error) {
    console.error("Spoonacular API Error:", error.message);
    throw new Error("Failed to fetch recipes from external API");
  }
};

module.exports = { getRecipesByIngredients };
