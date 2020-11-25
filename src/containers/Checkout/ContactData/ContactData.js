import React, { useState } from 'react';
import { withRouter }  from 'react-router-dom' 
import { connect } from 'react-redux';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import InputWrapper from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/WithErrorHandler';
import * as actions from '../../../store/actions/orderActions';
import checkValidity from '../../../shared/checkValidity';
import './ContactData.css';

const ContactData = props => {
    const [orderForm, orderFormHandler] = useState({
        name: {
            elementType: 'input', // type of the element to be rendered
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
            },
            valid: false,
            touched: false,
        },  
        phone: {
            elementType: 'input', 
            elementConfig: {
                type: 'phone',
                placeholder: 'phone number'
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
                isNumeric: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input', 
            elementConfig: {
                type: 'text',
                placeholder: 'Your street',
            },
            value: '',
            validation: {
                required: true,
                minLength: 1,
            },
            valid: false,
            touched: false,
        },
            house: {
                elementType: 'input', 
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your house number',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                },
                valid: false,
                touched: false,
            },
        
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'select time', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                valid: true,
            }
        }
    );
        
    const [formIsValid, formIsValidHandler] = useState(false);
    const [loading, loadingHandler] = useState(false);

    

    const orderHandler = e => {
        e.preventDefault();
        loadingHandler(true)
    
    

        const formData = {};
        for(let formElem in orderForm) {  //looping through every form element in orderForm
            formData[formElem] = orderForm[formElem].value // gets the updated value
        }

        const order = {
            ingredients: props.ings,
            price: Number.parseFloat(props.price).toFixed(2),
            orderData: formData, 
            userId: props.userId,
        };   

        props.onOrderBurger(order, props.token);
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...orderForm
        },
        updatedFormTwice = { // it is required to make a deep copy of a particular input
            ...updatedForm[inputIdentifier] 
        }
        updatedFormTwice.value = event.target.value;
        updatedFormTwice.valid = checkValidity(updatedFormTwice.value, updatedFormTwice.validation);
        updatedFormTwice.touched = true;
        updatedForm[inputIdentifier] = updatedFormTwice;

        let formIsValidated = true;
        for (let inputIdentifier in updatedForm) {
            formIsValidated = updatedForm[inputIdentifier].valid && formIsValidated;
        }

        orderFormHandler(updatedForm);
        formIsValidHandler(formIsValidated);

    }

    const formsArray = [];
    for(let key in orderForm) {
        formsArray.push({
            id: key,
            setUp: orderForm[key]
        })
    }

    let form = <Spinner />
        if(!props.loading) {
            form = (               
                <form action="#">
                    {formsArray.map(item => {
                        return <InputWrapper 
                            elementType = {item.setUp.elementType}
                            elementConfig = {item.setUp.elementConfig}
                            value = {item.setUp.value}
                            invalid = {!item.setUp.valid}
                            touched = {item.setUp.touched}
                            minLength = {item.setUp.validation ? item.setUp.validation.minLength : ' '}
                            key = {item.id}
                            changed = {(event) => inputChangeHandler(event, item.id)} // item.id is a name of the object, see for(in) loop in formsArray above
                        />
                    })}
                    <Button btnType = 'Success' 
                        clicked = {orderHandler} 
                        disabled = {!formIsValid}>
                        Order
                    </ Button>
                </form>
              )
        }


        return(
            <div className = 'ContactData'>
                <h2>Please Enter Your Contact Information</h2>
                {form}
            </div>
        )
    }
    

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger:  (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(WithErrorHandler (ContactData, axios)));