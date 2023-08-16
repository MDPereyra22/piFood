const axios = require("axios");
const { Recipe } = require('../db');
const {getApiAndDbRecipes} = require("./getAllRecipes")
require('dotenv').config();
const {
  API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/"


const getRecipeById = async (req, res) => {
  const { id } = req.params


  try {
    const apiAndDbRecipes = await getApiAndDbRecipes();
    const foundRecipe = apiAndDbRecipes.find((recipe) => recipe.id.toString() === id);

    foundRecipe ?
    res.status(200).json(foundRecipe) :
    res.status(204).send("Recipe not found")

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = getRecipeById;