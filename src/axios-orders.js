import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-26a98.firebaseio.com'
});

export default instance;

