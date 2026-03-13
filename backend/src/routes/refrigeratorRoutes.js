const express = require('express');
const { body, param, validationResult } = require('express-validator');

const { getIngredients, addIngredient, updateIngredient, deleteIngredient } = require("../controllers/refrigeratorController.js");

const router  = express.Router();

router.get('/', getIngredients);

router.post(
  '/',
  [
    body('ingredientName').notEmpty().withMessage('Ingredient name is required').trim().escape(),
    body('quantity').isNumeric().withMessage('Quantity must be a number'),
    body('unitMeasurement').notEmpty().withMessage('Unit is required').trim().escape()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addIngredient
);

router.delete(
  '/:id',
  [
    param('id').isInt().withMessage('ID must be a valid iteger').toInt()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  deleteIngredient
);

router.put(
  '/:id', 
  [
    param('id').isInt().withMessage('ID must be a valid iteger').toInt(),
    body('quantity').isNumeric().withMessage('Quantity must be a number')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateIngredient
);

module.exports = router;
