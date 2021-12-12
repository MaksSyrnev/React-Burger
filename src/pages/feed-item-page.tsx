import { useState, useEffect } from 'react';
import { OPEN_ITEM_FEED, CLOSE_ITEM_FEED } from '../services/actions/order-feed';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws-action-type';
import { useParams } from 'react-router-dom';
import styles from './page.module.css';
import { useDispatch, useSelector } from '../services/types/hooks';
import ItemOrdersHistory from '../components/item-orders-history/item-orders-history';
import { NotFound404 } from './not-found';
import { TWSOrders } from '../services/types/types';

type TOrderIDParam = {
  orderId: string;
};

export function FeedItemPage() {
  const dispatch = useDispatch();
  const orderData = useSelector(store => store.itemFeed);
  const ordersData: TWSOrders = useSelector(store => store.ws.orders);
  const [isReal, setIsReal] = useState(true);
  let { orderId } = useParams<TOrderIDParam>();
  const wsURL = 'wss://norma.nomoreparties.space/orders/all';

  /* const init = () => {
    const currentOrder = ordersData.orders.filter(
      (item) => item._id === orderId
    );

    if (currentOrder.length > 0) {
      const currentOrderItem = currentOrder[0];

      setIsReal(true);
    }
  }; */


  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsURL
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
      dispatch({
        type: CLOSE_ITEM_FEED
      });
    };
  }, [dispatch]);

  /*  useEffect(() => {
     if (orderData.number !== null) {
       setIsReal(true);
     }

   }, [orderData]); */

  return (
    <>
      {isReal && <div className={styles.wrapper_feed_item}>
        <div className={styles.container}>
          <ItemOrdersHistory />
        </div>
      </div>}
      {!isReal && <NotFound404 />}
    </>
  );
}
