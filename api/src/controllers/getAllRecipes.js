const axios = require('axios');
const { Recipe } = require('../db');
require('dotenv').config();
const {
  API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey="

const getAllRecipes = async (req, res) => {
  try {
    const { data } = await axios.get(`${URL}${API_KEY}&number=100&addRecipeInformation=true`);
    const apiRecipes = await data.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        image: el.image,
        summary: el.summary,
        healthScore: el.healthScore,
        steps: el.analyzedInstructions[0]?.steps.map((step) => {
          return {
            number: step.number,
            step: step.step,
          };
        }),
        diets: el.diets
      }
    });
    
    const dbRecipes = await Recipe.findAll(); 

    const allRecipes = [...apiRecipes, ...dbRecipes]; 

    res.status(200).json(allRecipes);

  } catch (error) {
    console.error('Error al encontrar recetas:', error);
    res.status(400).json({ error: 'Error al encontrar recetas' });
  }
}

module.exports = getAllRecipes;