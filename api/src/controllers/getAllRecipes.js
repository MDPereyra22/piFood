const axios = require('axios');
const { Recipe, Diets } = require('../db');
require('dotenv').config();
const {
  API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey="

const getAllRecipes = async (req, res) => {
  const name = req.query.name
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

    const dbRecipes = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }
    });

    const allRecipes = [...apiRecipes, ...dbRecipes];

    const dietsArray = dbRecipes.map(data => data.diets.map(diet => diet.dataValues));
    console.log(dietsArray);

    if (name) {
      let recipesName = allRecipes.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
      recipesName.length ?
        res.status(200).send(recipesName) :
        res.status(400).send("No se encontró el personaje")
    } else {
      res.status(200).json(allRecipes);
    }



  } catch (error) {
    console.error('Error al encontrar recetas:', error);
    res.status(400).json({ error: 'Error al encontrar recetas' });
  }
}

module.exports = getAllRecipes;