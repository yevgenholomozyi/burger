
import React, { Fragment, useState, useEffect } from 'react';
import axios from '../axios-orders';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {

        const [ error, errorHandler ] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            errorHandler(null);
            return req;
        });
        
        const resInterceptor = axios.interceptors.response.use(res => res, err => {
            errorHandler(err);
        });
        
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor)
            };
        }, [reqInterceptor, resInterceptor])
        

        const errorConfirmedHandler = () => {
            errorHandler(null);
        }

      
        return (
            <>
                <Modal 
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
        
    }
}

export default withErrorHandler;