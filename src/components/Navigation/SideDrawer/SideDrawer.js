import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NaviagtionItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses.pop();
        attachedClasses.push(classes.Open);
    }
    return (
        <Fragment>
            <Backdrop
                show = {props.open} 
                clicked = {props.closed}
            />
            <div className = {attachedClasses.join(' ')} onClick = {props.closed}>
                <div className = {classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth = {props.isAuth} />
                </nav>
            </div>
        </Fragment>
    )
}
export default SideDrawer;
