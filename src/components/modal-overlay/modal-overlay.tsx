import React, { FC } from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import { IModalOverlay } from '../../services/types/types';
//import PropTypes from 'prop-types';

const ModalOverlay: FC<IModalOverlay> = (props: IModalOverlay) => {

  const handleClick = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  }

  React.useEffect(() => {

    document.addEventListener('keydown', handleClick);

    return () => {
      document.removeEventListener('keydown', handleClick)
    };

  }, []);

  return (
    <section className={`${modalOverlayStyle.popup} `} onClick={props.onClose} >
      {props.children}
    </section >
  );

};

// ModalOverlay.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.element.isRequired
// }

export default ModalOverlay;
