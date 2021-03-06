import React from 'react';
import style from './orders-list-item.module.css';
import { Link, useLocation } from 'react-router-dom';
import { OrderIngredientsList } from '../order-ingredients-list/order-ingredients-list';
import moment from 'moment';
import 'moment/locale/ru';
import { TLocataionState, TItemOrder } from '../../services/types/types';

interface IOrdersListItem {
  dataItem: TItemOrder;
}

export const OrdersListItem: React.FC<IOrdersListItem> = ({ dataItem }) => {
  const { pathname }: TLocataionState = useLocation();
  const location: TLocataionState = useLocation();
  const feedId = dataItem._id;
  const activeStatus: boolean | string = pathname === '/feed' ? '' : 'true';

  return (
    <Link
      key={feedId}
      to={{
        pathname: `${pathname}/${feedId}`,
        state: { background: location },
      }}
      className={style.link}
    >
      <div className={`${style.card} p-6`}>

        <p className={`${style.servise_line} mb-6`}>
          <span className={`{style.number} text text_type_digits-default`}>#{dataItem.number}</span>
          <span className={`${style.time} text text_type_main-default text_color_inactive`}>{moment(dataItem.createdAt).calendar()}</span>
        </p>
        <h2 className={`{style.title} text text_type_main-medium`}>{dataItem.name}</h2>

        {
          activeStatus && (
            <p className={`mt-2 text text_type_main-default`}>
              {dataItem.status}
            </p>)
        }

        <div className={`${style.order_content} mt-6`}>
          <OrderIngredientsList dataIngredients={dataItem.ingredients} />
        </div>

      </div>
    </Link>
  );
};
