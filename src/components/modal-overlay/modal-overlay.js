import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {

  return (
    <section className={`${modalOverlayStyle.popup} `} onClick={props.onClose}>
      {props.children}
    </section >
  );

};

export default ModalOverlay;
