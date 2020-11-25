import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients) // to get an array of the keys;
        .map(item => {
            return [...Array(props.ingredients[item])] // to get an array, where the length is the amount of the given ingredients: e.g. meat: 2 items, salad: 1 item etc
            .map((_, i) => {
                return <BurgerIngredient key={item + i} type={item}></BurgerIngredient> // to get as many BurgerIngredients, as the length of the previous array
            }
        );
    })
    .reduce((arr, el) => {return arr.concat(el)}, [])
    if (transformIngredients.length ===  0) {
        transformIngredients = <p>Please Choose Your Ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>    
            {transformIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}
export default burger;