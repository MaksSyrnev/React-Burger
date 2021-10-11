import style from './list-orders-cards.module.css';
import { OrdersListItem } from '../orders-list-item/orders-list-item';

export function ListOrdersCards() {
  return (
    <div className={` ${style.box} pr-2`}>
      <ul className={`${style.list} `}>
        <li className="pb-4"><OrdersListItem /></li>
        <li className="pb-4"><OrdersListItem /></li>
        <li className="pb-4"><OrdersListItem /></li>
        <li className="pb-4"><OrdersListItem /></li>
        <li className="pb-4"><OrdersListItem /></li>
        <li className="pb-4"><OrdersListItem /></li>
        <li className="pb-4"><OrdersListItem /></li>
      </ul>
    </div>

  );
}
