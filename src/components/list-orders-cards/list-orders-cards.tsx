import { FC } from 'react';
import style from './list-orders-cards.module.css';
import { OrdersListItem } from '../orders-list-item/orders-list-item';
import { TWSOrders } from '../../services/types';

interface IListOrdersCards {
  dataOrders: TWSOrders;
}

export const ListOrdersCards: FC<IListOrdersCards> = ({ dataOrders }) => {
  const { orders } = dataOrders;

  return (
    <div className={` ${style.box} pr-2`}>
      <ul className={`${style.list} `}>
        {orders !== undefined
          ? orders.map(function (item) {
            return (<li className="pb-4" key={item._id}>
              <OrdersListItem dataItem={item} />
            </li>);
          })
          : null
        }
      </ul>
    </div>
  );
}
