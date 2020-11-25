import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/orderActions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId)
    }

    render() {
        const spinner = this.props.loading ? <Spinner /> : null;
        return (
            <Fragment>
                {spinner}
                {this.props.orders.map(item => (
                    <Order 
                        key={item.id}
                        ingeredients={item.ingredients}
                        price={item.price}
                    />
                ))}
            </Fragment>
        )
 }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token, 
        userId: state.auth.userId,
    }
}
const mapDispathToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}
export default connect (mapStateToProps, mapDispathToProps) (withErrorHandler(Orders, axios));