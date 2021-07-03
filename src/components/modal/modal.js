import React from 'react';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = (props) => {

  return (
    <div className={`${modalStyle.box} pl-10 pr-10 pt-10 pb-15`}>
      <div className={modalStyle.header}>
        <h2 className={`${modalStyle.title} text text_type_main-large`}>{props.title}</h2>
        <CloseIcon type="primary" onClick={props.onClose} />
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );

};

export default Modal;
