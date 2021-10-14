import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './orders-history.module.css';
import { OrdersListItem } from '../orders-list-item/orders-list-item';


const OrdersHistory = () => {
  const dispatch = useDispatch();
  return (
    <div className={style.orders_list_box}>
      <ul className={style.orders_list}>
        <li className="pb-6"><OrdersListItem /></li>
        <li className="pb-6"><OrdersListItem /></li>
        <li className="pb-6"><OrdersListItem /></li>
        <li className="pb-6"><OrdersListItem /></li>
        <li className="pb-6"><OrdersListItem /></li>
        <li className="pb-6"><OrdersListItem /></li>
        <li className="pb-6"><OrdersListItem /></li>
      </ul>
    </div >
  );
};

export default OrdersHistory;
