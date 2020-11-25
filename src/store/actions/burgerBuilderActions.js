import * as actions from './actions';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actions.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actions.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actions.SET_INGREDIENT,
        ingredients: ingredients,
    }
}


export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-26a98.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fethcIngredientsFailed())
            })
    }        
}

export const fethcIngredientsFailed = () => {
    return {
        type: actions.FETCH_INGREDIENTS_FAILED
    }
}