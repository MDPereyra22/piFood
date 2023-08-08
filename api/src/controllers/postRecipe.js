const { Recipe } = require("../db");

const postRecipe = async (req, res) => {
    try {
        const { title, image, summary, healthScore, instructions } = req.body;

        if (!title || !image || !summary || !healthScore || !instructions) {
            return res.status(401).send("Faltan datos");
        }

        await Recipe.create({
            title,
            image,
            summary,
            healthScore,
            instructions,
        });

        const recipesDB = await Recipe.findAll()

        return res.json(recipesDB);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = postRecipe;
