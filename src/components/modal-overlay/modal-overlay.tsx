import React, { FC, ReactNode } from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
//import PropTypes from 'prop-types';

export interface IModalOverlay {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlay> = (props) => {

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
