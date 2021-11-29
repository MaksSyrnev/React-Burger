import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import style from './orders-history.module.css';
import { OrdersListItem } from '../orders-list-item/orders-list-item';
import { getCookie } from '../../services/utils';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../services/actions/ws-action-type';
import { TItemOrder } from '../../services/types/types';

const OrdersHistory: FC = () => {
  const wsURL2 = 'wss://norma.nomoreparties.space/orders?token=';
  const dispatch = useDispatch();
  const ordersHistory = useSelector(store => store.ws.orders);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsURL2 + getCookie("token")
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
    }
  }, [dispatch]);

  return (
    <div className={style.orders_list_box}>
      <ul className={style.orders_list}>
        {ordersHistory.orders !== undefined
          ? ordersHistory.orders.map(function (item: TItemOrder) {
            return (
              <li className="pb-6" key={item._id}>
                <OrdersListItem dataItem={item} />
              </li>);
          })
          : null
        }
      </ul>
    </div >
  );
};

export default OrdersHistory;
