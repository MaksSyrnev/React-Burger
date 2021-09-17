import React from 'react';
import PropTypes from 'prop-types';
import orderDetailsStyle from './order-details.module.css';
import pathDone from '../../images/done.svg';

const OrderDetails = (props) => {

  return (
    <div className={orderDetailsStyle.box}>
      <p className={`${orderDetailsStyle.title} text text_type_digits-large`}>{props.orderNumber}</p>
      <p className="mt-8 mb-15 text text_type_main-medium">идентификатор заказа</p>
      <img src={pathDone} alt="готово" />
      <p className="mt-15 mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyle.subtitle} mb-30 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );

};

export default OrderDetails;

OrderDetails.propTypes = {
  orderNumber: PropTypes.number
};
