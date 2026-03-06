const { getIngredientsFromDB, addIngredientToDB, updateIngredientFromDB, deleteIngredientFromDB} = require("../models/refrigeratorModal.js")

const getIngredients = async(req, res) => {
  try{
    const ingredients = await getIngredientsFromDB();
    res.json(ingredients);
  } catch (error){
      console.error(error);
      res.status(500).json({erro: "Erro ao buscar a geladeira"});
  };
};

const addIngredient = async(req, res) => {
  const { userId, ingredientName, quantity, unitMeasurement } = req.body;
  try {
    await addIngredientToDB(userId, ingredientName, quantity, unitMeasurement);
    res.status(201).json({ message: "Ingredient added successfully!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to add ingredient" });
  };
};

const updateIngredient = async(req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try{
    await updateIngredientFromDB(id, quantity);
    res.status(200).json({ message: "Ingredient update successfully!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update ingredient" });
  }
};

const deleteIngredient = async(req, res) => {
  const { id } = req.params;

  try{
    await deleteIngredientFromDB(id);
    res.status(200).json({ message: "Ingredient delete successfully!" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete ingredient" });
  }
};

module.exports = { getIngredients, addIngredient, updateIngredient, deleteIngredient };
