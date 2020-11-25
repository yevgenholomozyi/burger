import React from 'react';
import Button from '../../UI/Button/Button';
import './OrderSummary.css';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(item => {
            if(props.ingredients[item] === 0) {
                return null
            } else {
                return (<li key={item}> {item}: {props.ingredients[item]}</li>)
            }
        })
            
    return (
        <div className = 'OrderSummary'>
            <h3>Your Order</h3>
            <p>A deliceous Burger with</p>
            <ul className = 'OrderSummaryList'>
                {ingredientsSummary}
            </ul>
            <p className='TotalPrice'>Total Price is ${props.price}</p>
            <p>Continue to Checkout</p>
            <div>
                <Button 
                    btnType = 'Danger' 
                    clicked = {props.cancell}>
                        Cancell
                </Button>
                <Button 
                    btnType = 'Success' 
                    clicked = {props.continue}>
                        Continue
                </Button>
            </div>
        </div>
    )
}
export default OrderSummary;