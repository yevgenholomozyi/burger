import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItem.css';

const NavigationItem = props => (
    <li className = 'NavigationItem'>
        <NavLink to = {props.link} exact >{props.children}</NavLink>
    </li>
)
export default NavigationItem;
