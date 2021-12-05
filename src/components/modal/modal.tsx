import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { IModal } from '../../services/types/types';
//import PropTypes from 'prop-types';

const modalRoot: any = document.getElementById("react-modals");

const Modal: FC<IModal> = (props) => {

  return ReactDOM.createPortal(
    (
      <ModalOverlay onClose={props.onClose}>
        <div className={`${modalStyle.box} pl-10 pr-10 pt-10 pb-15`} onClick={(e) => e.stopPropagation()}>
          <div className={modalStyle.header}>
            <h2 className={`${modalStyle.title} text text_type_main-large`}>{props.title}</h2>
            <div className={modalStyle.button_close}> <CloseIcon type="primary" onClick={props.onClose} /></div>
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </ModalOverlay>
    ),
    modalRoot);
};

// Modal.propTypes = {
//   title: PropTypes.string,
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.element.isRequired
// };

export default Modal;
