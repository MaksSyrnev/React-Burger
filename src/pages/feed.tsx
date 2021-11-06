import { useEffect } from 'react';
import styles from './page.module.css';
import { ListOrdersCards } from '../components/list-orders-cards/list-orders-cards';
import { OrdersCount } from '../components/orders-count/orders-count';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws-action-type';
import { TWSOrders } from '../services/types';

export function FeedPage() {
  const dispatch = useDispatch();
  const feedOrders: TWSOrders = useSelector((store: any) => store.ws.orders);
  const wsURL = 'wss://norma.nomoreparties.space/orders/all';


  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsURL
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
    };
  }, [dispatch]);

  return (
    <div className={styles.wrapper_feed}>
      <h1 className="text text_type_main-large pb-5 pt-10">
        Лента заказов
      </h1>
      <div className={styles.container_feed}>
        <ListOrdersCards dataOrders={feedOrders} />
        <OrdersCount dataOrders={feedOrders} />
      </div>
    </div>
  );
}
