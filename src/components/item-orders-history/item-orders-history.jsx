//компонента отображения подробностей заказа - модальное или простая страница
import style from './item-orders-history.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ItemOrdersHistory = () => {
  return (
    <div className={style.box}>
      <p className={`${style.number} text text_type_digits-default`}>#131316</p>
      <h2 className={`${style.title} mt-10 mb-3  text text_type_main-medium`}>Black Hole Singularity острый бургер</h2>
      <p className={`${style.status} text text_type_main-default ${style.status_done}`}>Выполнен</p>
      <div className="mt-15 mb-10">
        <p className="mb-6 text text_type_main-medium">Состав:</p>
        <div className={`${style.order_list_box} pr-6 `}>
          <ul className={style.order_content_list}>
            <li className={`${style.container_ingredient} mb-4`}>
              <div className={`${style.image_ingredient} mr-4`}>
                <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" className={style.ingredient_img} alt="" />
              </div>
              <p className={`${style.name_ingredient} text text_type_main-default`}>Флюоресцентная булка R2-D3</p>
              <div className={`${style.price_ingredient} ml-4`}>
                <p className="text text_type_digits-default">
                  2 x 20
                </p>
                <CurrencyIcon type="primary" /></div>
            </li>

            <li className={`${style.container_ingredient} mb-4`}>
              <div className={`${style.image_ingredient} mr-4`}>
                <img src="https://code.s3.yandex.net/react/code/meat-01-mobile.png" className={style.ingredient_img} alt="" />
              </div>
              <p className={` ${style.name_ingredient} text text_type_main-default`}>Биокотлета из марсианской Магнолии</p>
              <div className={`${style.price_ingredient} ml-4`}>
                <p className="text text_type_digits-default">
                  2 x 20
                </p>
                <CurrencyIcon type="primary" /></div>
            </li>

            <li className={`${style.container_ingredient} mb-4`}>
              <div className={`${style.image_ingredient} mr-4`}>
                <img src="https://code.s3.yandex.net/react/code/meat-02-mobile.png" className={style.ingredient_img} alt="" />
              </div>
              <p className={` ${style.name_ingredient} text text_type_main-default`}>Филе Люминесцентного тетраодонтимформа</p>
              <div className={`${style.price_ingredient} ml-4`}>
                <p className="text text_type_digits-default">
                  2 x 20
                </p>
                <CurrencyIcon type="primary" /></div>
            </li>
          </ul>
        </div>
      </div>

      <div className={style.footer}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={style.total_price}>
          <p className="text text_type_digits-default">
            510
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>
  );
};

export default ItemOrdersHistory;
