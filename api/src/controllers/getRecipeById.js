const axios = require("axios");
const { Recipe } = require('../db');
const { getApiAndDbRecipes } = require("./getAllRecipes");
require('dotenv').config();
const {
  API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/";

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const apiAndDbRecipes = await getApiAndDbRecipes();
    const foundRecipe = apiAndDbRecipes.find((recipe) => recipe.id.toString() === id);


    if (foundRecipe) {
      if (foundRecipe.createdInDb) {
        const normalizedSteps = foundRecipe.steps.map((step, index) => {
          return {
            number: index + 1,
            step: step.trim() // Trim to remove any leading/trailing spaces
          };
        });

        const recipeWithNormalizedSteps = {
          ...foundRecipe,
          steps: normalizedSteps
        };

        res.status(200).json(recipeWithNormalizedSteps);
      } else {
        res.status(200).json(foundRecipe)
      };
    } else {
      res.status(204).send("Recipe not found");
    };

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = getRecipeById;
