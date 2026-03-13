const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const refrigeratorRoutes = require('./src/routes/refrigeratorRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes.js');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/geladeira', refrigeratorRoutes);
app.use('/receitas', recipeRoutes);

module.exports = app;
