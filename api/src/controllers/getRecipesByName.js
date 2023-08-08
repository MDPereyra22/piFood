const axios = require('axios');
const { Recipe } = require('../db');
const {Op} = require("sequelize")
require('dotenv').config();
const {
  API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/"

const getRecipesByName = async (req, res) => {
  const { name } = req.query
  try {
    const recipeDB = await Recipe.findOne({ where: { title: { [Op.iLike]: `%${name}%` } } });

    const { data } = await axios.get(`${URL}complexSearch/?query=${name}&apiKey=${API_KEY}`);
    const recipes = data.results

    console.log(recipeDB);
    console.log(recipes)
    
    const combinedResults = recipeDB ? [...recipes, recipeDB] : recipes;


    if(combinedResults.length > 0){
      return res.status(200).json(combinedResults)
    } else {
      return res.status(404).json({ error: 'No se encontraron recetas con el nombre proporcionado' });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar recetas por nombre' });
  }
}

module.exports = getRecipesByName;