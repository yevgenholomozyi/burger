import React, { useEffect, useState } from 'react';
import InputWrapper from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import newObj from '../../shared/utility';
import checkValidity from '../../shared/checkValidity';
import { Redirect } from 'react-router-dom';


const Auth = props => {
    const [ authForm, authFormHandler ] = useState(
        {
            email: {
                elementType: 'input', 
                elementConfig: {
                type: 'email',
                    placeholder: 'Your email'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 3,
                        isEmail: true
                    }, 
                    valid: false,
                    touched: false,
                },

                password: {
                    elementType: 'input', 
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Your password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    }, 
                    valid: false,
                    touched: false,
                },
        }
    )

    const [signUp, signUpHandler] = useState(false);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = newObj (authForm, {
            [controlName]: newObj (authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }) 
        })
        authFormHandler(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, signUp);
    }

    const swithcAuthModeHandler = () => {
        signUpHandler(!signUp)
    }
    const formsArray = [];
    for(let key in authForm) {
        formsArray.push({
            id: key,
            setUp: authForm[key]
        })
    }
    let form = formsArray.map(item => (
        <InputWrapper 
            elementType = {item.setUp.elementType}
            elementConfig = {item.setUp.elementConfig}
            value = {item.setUp.value}
            invalid = {!item.setUp.valid}
            touched = {item.setUp.touched}
            minLength = {item.setUp.validation ? item.setUp.validation.minLength : ' '}
            key = {item.id}
            changed = {(event) => inputChangeHandler(event, item.id)} // item.id is a name of the object, see for(in) loop in formsArray above
        />
    ))
    if (props.loading) {
        form = <Spinner />
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = props.error.message
    }
    let redirected = null,
        header = 'Please Sign Up to Order a Burger',
        formText = "Already Have an Account? Click the 'SWITCH' Button";
    
    if (signUp) {
        formText = "Don't have an account? Click the Button below to Sign up";
        header = 'Please Sign In to Order a Burger';
    }
    if (props.isAuth) {
        if(props.ings) {
            redirected = <Redirect exact to = '/' />
        } 
        redirected = <Redirect to = {props.urlRedir} />
    }
        return (
            <div className = 'Auth'>
                {redirected}
                {errorMessage}
                <h3>{header}</h3>
                <p className = 'AuthText'>{formText}</p>
                <form action="#" onSubmit = {submitHandler}>
                    {form}
                    <Button btnType = 'Success' 
/*                         clicked = {OrderHandler} 
 */                        submitType = 'submit'
                    >
                        SUBMIT
                    </ Button>
                    <Button btnType = 'Danger' 
                        clicked = {swithcAuthModeHandler} 
                        submitType = 'button'
                    >
                        SWITCH TO {signUp ? 'SIGN IN' : 'SIGN UP'}
                    </ Button>
                </form>
            </div> 
        )
    }  

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        urlRedir: state.burgerBuilder.urlRedir,
        ings: state.burgerBuilder.ingredients !== null,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Auth);