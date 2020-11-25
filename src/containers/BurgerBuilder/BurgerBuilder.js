import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler';
import * as  actions from '../../store/actions/burgerBuilderActions';
import * as orderActions from '../../store/actions/orderActions';
import axios from '../../axios-orders';

export const BurgerBuilder = (props) => {
    const [purchasing, purchasingHandler] = useState(false);
   

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(item => {
                return ingredients[item]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0;
    }
/* 
    purchasableHandler = (obj) => {  // toggles purchasable state depending on ingredients value. This method will be called below inside increaseIngredientHandler and increaseIngredientHandler 
        for (let key in obj){
            if(obj[key] > 0) {
                this.setState({
                    purchasable: true
                })
                break;
            } else {
                this.setState({
                    purchasable: false
                })
            }
        }d
    } */

    useEffect(() => {
        props.onInitIngredients()
       },
       []
    )

    const purchaseHandler = () => { // calls the modal window, works on 'Order Now' button. 
        if(props.isAuth) {
            purchasingHandler(true)
        } else {
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => { // removes the modal window on 'Cancell' button, as the modal window depends on 'purchasing' value 
        purchasingHandler(true)
    }

    const purchaseContinueHandler = () => { // sends data to the server on click on 'Continue' button
        props.onInitPurchase();
        props.history.push('/checkout');
    }
    const disabledInfo = {
        ...props.ings
    }

    for(let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0 // check true or false whether key is equal or less than 0
    }

    let orderSummary = null;
    let burger =  props.error ? <p>ingredients cant be shown</p> : <Spinner/> 
    if(props.ings) {
        burger = (
            <>
            <Burger ingredients = {props.ings}/>
            <BuildControls
                ingredientAdded = {props.onIngredientAdded}
                ingredientRemoved = {props.onIngredientRemoved}
                disable = {disabledInfo}
                price = {props.prc}
                isAuth = {props.isAuth}
                purchasable = {updatePurchaseState(props.ings)}
                ordered = {purchaseHandler}
                />
            </>
            )
            orderSummary = <OrderSummary 
                ingredients = {props.ings}
                price = {props.prc.toFixed(2)}
                continue = {purchaseContinueHandler}
                cancell = {purchaseCancelHandler}
             />
        
    }        
    return (
        <>  
            <Modal 
                show = {purchasing} 
                    modalClosed = {purchaseCancelHandler}
                > 
                {orderSummary}
            </Modal>
                {burger}
        </>
    )
    
} 
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onErrorSet: () => dispatch(actions.fethcIngredientsFailed()),
        onInitPurchase: () => dispatch(orderActions.purchaseInit()),
    } 
 } 
 export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));  
