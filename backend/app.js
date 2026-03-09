const express = require('express');
const refrigeratorRoutes = require('./src/routes/refrigeratorRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes.js');

const app = express();
app.use(express.json())
app.use('/geladeira', refrigeratorRoutes);
app.use('/receitas', recipeRoutes);

module.exports = app;
