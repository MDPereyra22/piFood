import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";
export const RECIPES_BY_DIET = "RECIPES_BY_DIET";
export const SORT_RECIPES = "SORT_RECIPES";
export const SORT_BY_HEALTH_SCORE = "SORT_BY_HEALTH_SCORE";

export const getRecipes =()=>{
    const endpoint = 'http://localhost:3001/';
    return async (dispatch) =>{
        const {data} = await axios.get(endpoint)
        try {
            return dispatch({
                type: GET_RECIPES,
                payload: data
            })
            
        } catch (error) {
            console.error('Error al agregar el favorito:', error)
        }
    }
} 

export const filteredCharacterByDiets = (payload) =>{
    return {
        type: RECIPES_BY_DIET,
        payload: payload
    }
};

export const sortRecipes = (payload) => {
    return {
        type: SORT_RECIPES,
        payload: payload
    };
}

export const sortHealthScore = (payload) => {
    return {
        type: SORT_BY_HEALTH_SCORE,
        payload: payload
    };
}