import React from 'react';
import ReactDOM from 'react-dom';
import modalOverlayStyle from './modal-overlay.module.css';

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = (props) => {

  return ReactDOM.createPortal(
    (
      <section className={`${modalOverlayStyle.popup} `} onClick={props.onClose}>
        {props.children}
      </section >
    ),
    modalRoot);

};

export default ModalOverlay;
