import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {

    let inputElement = null,
        inputClasses = [classes.inputElement];

    if (props.invalid && props.touched)  {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case 'input':
            inputElement  = <input className = {inputClasses.join(' ')}
                {...props.elementConfig} 
                value = {props.value}
                onChange = {props.changed}
            />
        break;
        case 'textarea':
            inputElement = <textarea  className = {classes.inputElement}
                {...props.elementConfig} 
                value = {props.value}
                onChange = {props.changed}
            />
        break;
        case 'select':
            inputElement = (
                <select  className = {classes.inputElement} 
                    {...props.elementConfig} 
                    value = {props.value}
                    onChange = {props.changed}
                >
                   {props.elementConfig.options.map(item => {
                       return <option 
                                key = {item.value} 
                                value = {item.value}
                                onChange = {props.changed}
                                >
                                {item.displayValue}
                            </option>
                   })}
                </select>
                )
        break;
        default:
            inputElement = <input className = {classes.InputElement}
            {...props.elementConfig} 
            value = {props.value}
        />
    }

    let validationError = null;
        if(props.invalid && props.touched) {
            if(props.elementType === 'input' && props.elementConfig.type === 'text') {
                validationError = <p className = {classes.ErrorMassage}>Please enter letters only. Use at least {props.minLength} symbols</p>
            }
            if(props.elementType === 'input' && props.elementConfig.type === 'password') {
                validationError = <p className = {classes.ErrorMassage}>Please use both letters and numbers. Use at least 6 symbols</p>
            }
            if(props.elementType === 'input' && props.elementConfig.type === 'email') {
                validationError = <p className = {classes.ErrorMassage}>Please use a '@' symbol and a dot. E-mail should not be shorten than {props.minLength} symbols</p>
            }
            if(props.elementType === 'input' && props.elementConfig.type === 'number') {
                validationError = <p className = {classes.ErrorMassage}> Please use numbers only in this field.</p>
            }
            if(props.elementType === 'input' && props.elementConfig.type === 'phone') {
                validationError = <p className = {classes.ErrorMassage} >Please use a numbers only. Enter exactly {props.minLength} symbols</p>
            }
        }

    return (
        <div className = {classes.InputWrapper}> 
            <label className = {classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )

}
export default Input;