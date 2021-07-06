import React from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClose={props.onClose}>
        <div className={`${modalStyle.box} pl-10 pr-10 pt-10 pb-15`}>
          <div className={modalStyle.header}>
            <h2 className={`${modalStyle.title} text text_type_main-large`}>{props.title}</h2>
            <CloseIcon type="primary" onClick={props.onClose} />
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </ModalOverlay>
    ),
    modalRoot);
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
