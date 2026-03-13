const express = require('express');
const { param, validationResult } = require('express-validator');
const router  = express.Router();

const { getRecipes, getSingleRecipe} = require("../controllers/recipeController.js");

router.get('/', getRecipes);
router.get(
  '/:id', 
  [
    param('id').isInt().withMessage('ID must be a valid iteger').toInt(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  getSingleRecipe
);

module.exports = router;
