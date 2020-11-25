import React from 'react';
import burgerLogo from '../../assets/logo.png';
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt = 'My Burger'/>
    </div>
)
export default Logo;
