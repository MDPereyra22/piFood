const { Recipe, Diets } = require("../db");

const postRecipe = async (req, res) => {
    try {
        const { title, image, summary, healthScore, steps, diets } = req.body;

        if (!title || !image || !summary || !healthScore || !steps || !diets) {
            return res.status(401).send("Faltan datos");
        }

        let recipeCreated = await Recipe.create({
            title,
            image,
            summary,
            healthScore,
            steps,
        });

        let dietsDb = await Diets.findAll({
            where: {name: diets}
        })

        

        recipeCreated.addDiets(dietsDb)

        return res.send("Receta creada con éxito");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = postRecipe;
