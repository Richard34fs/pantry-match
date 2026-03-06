const express = require('express');
const router  = express.Router();

const { getIngredients, addIngredient, updateIngredient, deleteIngredient } = require("../controllers/refrigeratorController.js");

router.get('/', getIngredients);
router.post('/', addIngredient);
router.delete('/:id', deleteIngredient);
router.put('/:id', updateIngredient);

module.exports = router;
