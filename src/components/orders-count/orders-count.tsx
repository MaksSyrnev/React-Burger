import style from './orders-count.module.css';
import { FC } from 'react';
import { TOrdersCount, TWSOrders } from '../../services/types/types';

interface IOrdersCount {
  dataOrders: TWSOrders;
}

export const OrdersCount: FC<IOrdersCount> = ({ dataOrders }) => {
  const { orders, total, totalToday }: TOrdersCount = dataOrders;

  return (
    <div className={` ${style.box} pl-15`}>
      <div className={style.box_orders}>
        <div className={`${style.box_list} mr-9`} >
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <ul className={`${style.orders_list} ${style.status_ready}`}>
            {orders !== undefined
              ? orders.map(function (item) {
                if (item.status === "done") {
                  return (<li className="text text_type_digits-default" key={item._id}>{item.number}</li>);
                } else {
                  return null;
                }
              })
              : null
            }
          </ul>
        </div>
        <div className={style.box_list}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <ul className={style.orders_list}>
            {orders !== undefined
              ? orders.map(function (item) {
                if (item.status !== "done") {
                  return (<li className="text text_type_digits-default" key={item._id}>{item.number}</li>);
                } else {
                  return null;
                }
              })
              : null
            }
          </ul>
        </div>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
      </div>

      <div className="mt-15">
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>

  );
}
