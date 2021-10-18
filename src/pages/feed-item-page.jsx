import { useState, useEffect } from 'react';
import { OPEN_ITEM_FEED, CLOSE_ITEM_FEED } from '../services/actions/order-feed';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws-action-type';
//import { useParams } from 'react-router-dom';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ItemOrdersHistory from '../components/item-orders-history/item-orders-history';
import { NotFound404 } from './not-found';

export function FeedItemPage() {
  const dispatch = useDispatch();
  const orderData = useSelector(store => store.itemFeed);
  const [isReal, setIsReal] = useState(false);

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
      dispatch({
        type: CLOSE_ITEM_FEED
      });
    };
  }, [dispatch]);

  useEffect(() => {
    if (orderData.number !== '') {
      setIsReal(true);
    }

  }, [orderData]);

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
