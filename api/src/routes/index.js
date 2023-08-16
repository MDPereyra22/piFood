const { Router } = require('express');
const {getAllRecipes} = require('../controllers/getAllRecipes')
const getRecipeById = require('../controllers/getRecipeById');
const getRecipesByName = require('../controllers/getRecipesByName')
const postRecipe = require("../controllers/postRecipe")
const getDiets = require("../controllers/getDiets")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/recipes', postRecipe);
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipeById);
// router.get('/recipes', getRecipesByName);
router.get('/diets', getDiets)



module.exports = router;
