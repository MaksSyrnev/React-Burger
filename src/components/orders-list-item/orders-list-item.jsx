import style from './orders-list-item.module.css';
import { useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderIngredientsList } from '../order-ingredients-list/order-ingredients-list';

export const OrdersListItem = ({ dateItem }) => {
  const { pathname } = useLocation();
  const activeStatus = pathname === '/feed' ? '' : 'true';

  return (
    <div className={`${style.card} p-6`}>
      <p className={`${style.servise_line} mb-6`}>
        <span className={`{style.number} text text_type_digits-default`}>#{dateItem.number}</span>
        <span className={`${style.time} text text_type_main-default text_color_inactive`}>{dateItem.createdAt}</span>
      </p>
      <h2 className={`{style.title} text text_type_main-medium`}>{dateItem.name}</h2>
      {activeStatus && (
        <p className={`mt-2 text text_type_main-default`}>
          {dateItem.status}
        </p>)
      }
      <div className={`${style.order_content} mt-6`}>
        <div><OrderIngredientsList dataIngredients={dateItem.ingredients} /></div>
        <div className={style.order_price}>
          <div className={style.price}>
            <p className={`{style.number} text text_type_digits-default`}>560</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};
