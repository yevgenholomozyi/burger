import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const  CheckoutSummary = (props) => {
    return (
        <div className = 'CheckoutSummary'>
            <h2>We Hope It Tastes Well</h2>
            <div style={{width: '100%', margin: '0'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
                <Button btnType = 'Danger' clicked = {props.checkoutCancelled}>Cancell</Button>
                <Button btnType = 'Success' clicked = {props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default CheckoutSummary; 