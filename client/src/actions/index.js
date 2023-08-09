import axios from "axios";
export const GET_RECIPES = "GET_RECIPES";

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
