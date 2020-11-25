import * as actionTypes from '../actions/actions';
import newObj from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return newObj(state, {error: null, loading: true})

        case actionTypes.AUTH_SUCCESS:
            return newObj(state, {token: action.idToken, userId: action.userId, error: null, loading: false, })

        case actionTypes.AUTH_FAILED:
            return newObj(state, {loading: false, error: action.error})

        case actionTypes.AUTH_LOGOUT: 
            return newObj(state, {token: null, userId: null})
        
        default: 
            return state
            
    }
}
export default authReducer;