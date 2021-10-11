import styles from './page.module.css';
import { ListOrdersCards } from '../components/list-orders-cards/list-orders-cards';
import { OrdersCount } from '../components/orders-count/orders-count';

export function FeedPage() {
  return (
    <div className={styles.wrapper_feed}>
      <h1 className="text text_type_main-large pb-5 pt-10">
        Лента заказов
      </h1>
      <div className={styles.container_feed}>
        <ListOrdersCards />
        <OrdersCount />
      </div>
    </div>
  );
}
