import * as actionType from '../actions/actions';
import newObj from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false, 
  purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_BURGER_START: 
            return newObj (state, {loading: true})
            
        case actionType.AUTH_FAILED: 
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return newObj (state, { loading: false,  purchased: false, orders: state.orders.concat(newOrder)})
            
        case actionType.PURCHASE_BURGER_FAILED: 
            return {
                ...state,
            }
        case actionType.PURCHASE_INIT:
            return newObj (state, {purchased: false})

        case actionType.FETCH_ORDERS_START:
            return newObj (state, {loading: true})

        case actionType.FETCH_ORDERS_SUCCESS: 
            return {
                ...state, 
                orders: action.orders,
                loading: false,
            }
            
        case actionType.FETCH_ORDERS_FAILED:
            return  newObj (state, {loading: false})

        case actionType.PURCHASE_BURGER_SUCCESS:
                const renewOrder = newObj ( action.orderData, { id: action.orderId } );
                return newObj ( state, {
                    loading: false,
                    purchased: true,
                    orders: state.orders.concat( renewOrder )
                    }
                )

        default: 
            return state
    }
}
export default orderReducer;