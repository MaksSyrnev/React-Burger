//компонента отображения подробностей заказа - модальное или простая страница
import { useEffect, FC } from 'react';
import style from './item-orders-history.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OPEN_ITEM_FEED, CLOSE_ITEM_FEED } from '../../services/actions/order-feed';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { TWSOrders, TItemFeed, TItemIngridient, TOrderId } from '../../services/types/types';

const ItemOrdersHistory: FC = () => {
  const dispatch = useDispatch();
  const orderId = useParams<TOrderId>();
  const data: Array<TItemIngridient> = useSelector(store => store.ingredients.items);
  const orderData: TItemFeed = useSelector((store: any) => store.itemFeed);
  const feedOrders: TWSOrders = useSelector((store: any) => store.ws.orders);
  const ordersData = feedOrders.orders;

  const init = () => {
    console.log(orderId);
    const currentOrder = ordersData.filter(
      (item) => item._id === orderId.id
    );

    if (currentOrder.length > 0) {
      const current = currentOrder[0];
      dispatch({
        type: OPEN_ITEM_FEED,
        item: current
      });
    }
  };

  useEffect(() => {
    if (ordersData !== undefined) {
      init();
    }

  }, [ordersData]);



  let total: number = 0;
  orderData.list.forEach(function (item) {
    const ingredientData = data.filter(element => element._id === item);
    if (ingredientData[0] !== undefined) {
      total = ingredientData[0].type === "bun" ? total + ingredientData[0].price * 2 : total + ingredientData[0].price;
    }
  });

  return (
    <div className={style.box}>
      <p className={`${style.number} text text_type_digits-default`}>#{orderData.number}</p>
      <h2 className={`${style.title} mt-10 mb-3  text text_type_main-medium`}>{orderData.name}</h2>
      <p className={`${style.status} text text_type_main-default ${style.status_done}`}>{orderData.status}</p>

      <div className="mt-15 mb-10">
        <p className="mb-6 text text_type_main-medium">Состав:</p>
        <div className={`${style.order_list_box} pr-6 `}>
          <ul className={style.order_content_list}>

            {(orderData.list !== undefined && orderData.list.length !== 0)
              ? orderData.list.map(function (item, index) {
                const ingredient = data.filter(element => element._id === item);
                if ((ingredient !== null) && (ingredient[0] !== undefined)) {
                  return (
                    <li className={`${style.container_ingredient} mb-4`} key={index}>
                      <div className={`${style.image_ingredient} mr-4`}>
                        <img src={ingredient[0].image_mobile} alt={ingredient[0].name} className={style.ingredient_img} />
                      </div>
                      <p className={`${style.name_ingredient} text text_type_main-default`}>{ingredient[0].name}</p>
                      <div className={`${style.price_ingredient} ml-4`}>
                        <p className="text text_type_digits-default">
                          {ingredient[0].type === "bun" ? `2 x ${ingredient[0].price}`
                            : `1 x ${ingredient[0].price}`}
                        </p>
                        <CurrencyIcon type="primary" /></div>
                    </li>);
                } else {
                  return null;
                }
              })
              : null
            }

          </ul>
        </div>
      </div>

      <div className={style.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {moment(orderData.data).calendar()}
        </p>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">
            {total}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>
  );
};

export default ItemOrdersHistory;
