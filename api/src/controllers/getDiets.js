const axios = require('axios');
const { Diets } = require('../db');
const { Op } = require("sequelize")
require('dotenv').config();
const {
    API_KEY
} = process.env;

const URL = "https://api.spoonacular.com/recipes/complexSearch?apiKey="

const getDiets = async (req, res) => {
    try {

        const dietsDB = await Diets.findAll();

        if (dietsDB.length > 0) {
            return res.status(200).json(dietsDB);
        }

        const response = await axios.get(`${URL}${API_KEY}&number=100&addRecipeInformation=true`);
        const recipes = response.data.results;

        const dietArray = recipes.map((data) => data.diets)

        console.log(dietArray)

        const concatenatedArray = dietArray.reduce((result, currentArray) => {
            return result.concat(currentArray);
        }, []);


        const setDiets = new Set(concatenatedArray);
        const filteredDiets = [...setDiets]

        for (const diet of filteredDiets) {
            await Diets.findOrCreate({ where: { name: diet } })
        }


        const allDiets = await Diets.findAll()

        return res.status(200).json(allDiets);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las dietas' });
    }
};

module.exports = getDiets;