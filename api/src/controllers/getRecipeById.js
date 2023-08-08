const axios = require("axios");
const { Recipe } = require('../db')
require('dotenv').config();
const {
  API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/"


const getRecipeById = async (req, res) => {
  const { id } = req.params


  try {
    const responseDB = await Recipe.findAll();
    const recipesDB = responseDB.filter((recipe) => recipe.id === id);

    const combinedResults = [...recipesDB];

    if (combinedResults.length > 0) {
      return res.status(200).json(combinedResults);
    } else {
      const { data } = await axios.get(`${URL}${id}/information?apiKey=${API_KEY}`)
      if (data) {
        const recipe = {
          id: data.id,
          title: data.title,
          image: data.image,
          summary: data.summary,
          healthScore: data.healthScore,
          steps: data.analyzedInstructions[0]?.steps.map((step) => {
            return {
              number: step.number,
              step: step.step,
            };
          }),
          diets: data.diets
        };
        return res.status(200).json(recipe);
      } else {
        return res.status(400).send("Not Found");
      };
    }


  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = getRecipeById;