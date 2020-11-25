import React from 'react';
import './Order.css'
const Order = (props) => {
    
    let ingeredients = [];
    for (let ingredientName in props.ingeredients) {
        ingeredients.push(
            {
                name: ingredientName, 
                amount: props.ingeredients[ingredientName]
            }
        )
    }
    let ingredientsOutput = ingeredients.map(item => {
        if(item.amount > 0 && item.amount) {
        return <span style = {{
                    textTransform: 'capitalize', 
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    padding: '5px',
                    margin: '0.8px'
                }} 
                key = {item.name}> {item.name}: {item.amount}</span>
        }
    })
   
return (
    <div className = 'Order'>
        
<p>You ordered a burger with: {ingredientsOutput}</p> 
        <p>Total Price Is: ${props.price}</p>
    </div>
    )
}
export default Order;