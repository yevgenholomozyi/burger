import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) =>  (
    <div className = 'BuildControls'>
        <p className='Price'>Current Price: {props.price.toFixed(2)} $</p>
        {controls.map(item => {
            return <BuildControl
                key = {item.label}
                label = {item.label}
                added = {() => props.ingredientAdded(item.type)}
                removed = {() => props.ingredientRemoved(item.type)}
                disabled = {props.disable[item.type]}
            />
        })}
        <button 
            className ='OrderButton' 
            disabled = {!props.purchasable}
            onClick = {props.ordered}
        >
            {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>

    </div>
);
export default BuildControls;