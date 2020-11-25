import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className = 'NavigationItems'>

        <NavigationItem link = '/'>Burger Builder</NavigationItem>

        {props.isAuth ? 
            <NavigationItem link = '/logout'>Logout</NavigationItem>
            : 
            <NavigationItem link = '/auth'>Authentication</NavigationItem>
        }
        
        {props.isAuth ? 
        <NavigationItem link = '/orders'>Orders</NavigationItem>
        : null
        }
    </ul>
)
export default NavigationItems;
