import React from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
    <>
        <Backdrop show = {props.show} clicked = {props.modalClosed}/>
        <div className='Modal'
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100%)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}   
        </div>
    </>
)
/* function areEqual (prevModal, nextModal){
    return nextModal.show === prevModal.show || nextModal.children === prevModal.children 
};  */
export default React.memo(Modal);