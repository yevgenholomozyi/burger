const checkValidity = (value, rules) => {
    let isValid = true;
        
    if (rules && rules.required) {
        isValid = value.trim() !== '' && isValid; // isValid is equal to a value of an input, but should not be equel to the empty string 
    }

    if(rules && rules.minLength) {
        isValid = value.length >= rules.minLength  && isValid;;
    }

    if(rules && rules.maxLength) {
    isValid = value.length <= rules.maxLength  && isValid;;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

export default checkValidity;