import React, { useState, Fragment } from "react";
import { Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from '../../hoc/asyncComponent';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import ToolBar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Logout from '../../containers/Auth/Logout/Logout';
import './Layout.css';

const asyncCheckout = asyncComponent(() => {
    return import('../../containers/Checkout/Checkout')
} )

const asyncAuth = asyncComponent(() => {
    return import('../../containers/Auth/Auth')
} )

const asyncOrders = asyncComponent(() => {
    return import('../../containers/Orders/Orders')
} )

const Layout = (props) => {
    const [showSideDrawer, showSideDrawerHandler] = useState(false);
   
    const showSideHandler = () => {
        showSideDrawerHandler(!showSideDrawer)
    }

    return (
        <Fragment>
            <ToolBar
             open = {showSideDrawer}
             closed = {showSideHandler}
             isAuth = {props.isAuth}
            />
            <SideDrawer 
                isAuth = {props.isAuth}
                open = {showSideDrawer}
                closed = {showSideHandler}
            />
                <main className = 'Content'>
                    {props.children}
                </main>
                <Route  path = '/' exact component = { BurgerBuilder } />
                {props.isAuth ? <Route path = '/checkout' component = { asyncCheckout } /> : <Redirect to = '/' /> }
                {props.isAuth ? <Route path = '/orders' component = { asyncOrders } /> : <Redirect to = '/' /> }
                <Route path = '/auth' component = { asyncAuth } />
                <Route path = '/logout' component = { Logout } />
             </Fragment>
        )
    
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,

    }
}
export default  connect (mapStateToProps) (Layout);