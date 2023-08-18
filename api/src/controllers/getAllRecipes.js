const axios = require('axios');
const { Recipe, Diets } = require('../db');
require('dotenv').config();
const {
  API_KEY,
  API_HABILITADA
} = process.env;

const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey="

const getApiRecipes = async () => {
  const { data } = await axios.get(`${URL}${API_KEY}&number=100&addRecipeInformation=true`);
  const apiRecipes = await data.results.map((el) => {
    return {
      id: el.id,
      title: el.title,
      image: el.image,
      summary: el.summary.replace(/<[^>]+>/g, ''),
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
  return apiRecipes;
}


const getDbRecipes = async () => {
  const dbRecipes = await Recipe.findAll({
    include: {
      model: Diets,
      attributes: ["name"],
    }
  })

  const a = dbRecipes.map(el => el.get({ plain: true }))

  let dbRecipesNormalized = [];
  a.forEach(recipe => {
    let normalizedRecipe = recipe
    const normalizedDiets = recipe.diets.map(d => d.name)
    normalizedRecipe.diets = normalizedDiets
    dbRecipesNormalized.push(normalizedRecipe)
  });

  return dbRecipesNormalized;
}

const getApiAndDbRecipes = async () => {
  let apiRecipes = []

  if (API_HABILITADA == "true")
    apiRecipes = await getApiRecipes()

  const dbRecipes = await getDbRecipes();


  const allRecipes = [...apiRecipes, ...dbRecipes];

  return allRecipes;
} 


const getAllRecipes = async (req, res) => {
  const name = req.query.name
  try {

    const allRecipes = await getApiAndDbRecipes();


    if (name) {
      let recipesName = allRecipes.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
      recipesName.length ?
        res.status(200).send(recipesName) :
        res.status(400).send("No se encontró la receta")
    } else {
      res.status(200).json(allRecipes);
    }



  } catch (error) {
    console.error('Error al encontrar recetas:', error);
    res.status(400).json({ error: 'Error al encontrar recetas' });
  }
}

module.exports = { getAllRecipes, getApiAndDbRecipes };