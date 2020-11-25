import * as actionType from '../actions/actions';
import newObj from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false,
    building: false,
    urlRedir: '/',
}


const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.6,
    bacon: 0.8,
    meat: 1.5,
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return newObj (
                state, 
                {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
                building: true,
                urlRedir: '/checkout',
                }
            )
    
        case actionType.REMOVE_INGREDIENT:
            return newObj (
                state,
                {
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                    },
                    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
                    building: true,
                    urlRedir: '/checkout',
                }
            )
    
        case actionType.SET_INGREDIENT:
            return newObj(
                state,
                {
                ingredients: {
                    salad: action.ingredients.salad,
                    cheese: action.ingredients.cheese,
                    bacon: action.ingredients.bacon,
                    meat: action.ingredients.meat,
                },
                totalPrice: 5,
                error: false,
                building: false,
                }
            )

        case actionType.FETCH_INGREDIENTS_FAILED:
            return newObj(state, {error: true});

        default:
            return state;
    }
};

export default burgerBuilderReducer;