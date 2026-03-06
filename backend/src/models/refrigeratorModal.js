const pool = require('../config/database.js');

const getIngredientsFromDB = async() => {
  const result = await pool.query('SELECT * FROM refrigerator');
  return result.rows;
};

const addIngredientToDB = async(userId, ingredientName, quantity, unitMeasurement) => {
  await pool.query(
    'INSERT INTO refrigerator (user_id, ingredient, quantity, unit_measurement) VALUES ($1, $2, $3, $4)', 
    [userId, ingredientName, quantity, unitMeasurement]
  )
};

const updateIngredientFromDB = async(id, quantity) => {
  await pool.query(
    'UPDATE refrigerator SET quantity = $2 WHERE id = $1',
    [id, quantity]
  )
};

const deleteIngredientFromDB = async(id) => {
  await pool.query(
    'DELETE FROM refrigerator WHERE id = $1',
    [id]
  )
};

module.exports = { getIngredientsFromDB, addIngredientToDB, updateIngredientFromDB, deleteIngredientFromDB }
