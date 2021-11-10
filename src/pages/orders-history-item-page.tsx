import { useState, useEffect } from 'react';
import { CLOSE_ITEM_FEED } from '../services/actions/order-feed';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws-action-type';
import { getCookie } from '../services/utils';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ItemOrdersHistory from '../components/item-orders-history/item-orders-history';
import { NotFound404 } from './not-found';

export function OrdersHistoryItemPage() {
  const dispatch = useDispatch();
  //const orderData = useSelector(store => store.itemFeed);
  const [isReal, setIsReal] = useState(true);

  const wsURL2 = 'wss://norma.nomoreparties.space/orders?token=';

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsURL2 + getCookie("token")
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE
      });
      dispatch({
        type: CLOSE_ITEM_FEED
      });

    }
  }, [dispatch]);


  /* useEffect(() => {
    if (orderData.number !== '') {
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
