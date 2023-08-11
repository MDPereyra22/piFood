import { GET_RECIPES, RECIPES_BY_DIET, SORT_RECIPES, SORT_BY_HEALTH_SCORE } from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case RECIPES_BY_DIET:
            const allRecipes = state.allRecipes
            const recipesFiltered = action.payload === "all" ? allRecipes : allRecipes.filter(el => el.diets.includes(action.payload))
            return {
                ...state,
                recipes: recipesFiltered
            }
        case SORT_RECIPES:
            const sortedRecipes = [...state.recipes].sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
                if (action.payload === "ascendente") {
                    return titleA.localeCompare(titleB);
                } else {
                    return titleB.localeCompare(titleA);
                }
            });
            return {
                ...state,
                recipes: sortedRecipes,
            };


        case SORT_BY_HEALTH_SCORE:
            const sortedRecipesByHealthScore = [...state.recipes];
            sortedRecipesByHealthScore.sort((a, b) => {
                if (action.payload === 'ascendente') {
                    return a.healthScore - b.healthScore;
                } else {
                    return b.healthScore - a.healthScore;
                }
            });
            return {
                ...state,
                recipes: sortedRecipesByHealthScore,
            };

            
        default:
            return { ...state }

    }
}

export default rootReducer;