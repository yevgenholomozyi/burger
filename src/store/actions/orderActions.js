import * as actions from './actions';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => { //syncronous creator
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFailed = (error) => { 
    return {
        type: actions.PURCHASE_BURGER_FAILED,
        error: error,
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post('/orders.json?auth=' + token, orderData)
            .then( response => {
                dispatch( purchaseBurgerSuccess(response.data.name, orderData));
            } )
            .catch( error => {
                dispatch( purchaseBurgerFailed(error));
            } );
    };
};

export const purchaseBurgerStart = () => {
   return {
        type: actions.PURCHASE_BURGER_START
   }
}

export const purchaseInit = () => {
    return {
        type: actions.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
} 

export const fetchOrdersFailed = (error) => {
    return {
        type: actions.FETCH_ORDERS_FAILED,
        error: error
    }    
}

export const fetchOrdersStart = () => {
    return {
        type: actions.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({ // creating a new array of objects with an ids
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));

        })
        .catch(err => {
            dispatch(fetchOrdersFailed(err));
        })
            
    };

}

