import React from 'react';
import classes from './Toolbar.module.css';
import Logo from  '../../Logo/Logo';
import NavigationItems from '../NaviagtionItems/NavigationItems';
import Menu from '../Menu/Menu';

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <Menu
         clicked = {props.closed}
        />
        <div className = {classes.Logo}>
            <Logo/>
        </div>
        <nav className = {classes.DesktopOnly}>
            <NavigationItems isAuth = {props.isAuth}/>
        </nav>

    </header>
)
export default Toolbar;