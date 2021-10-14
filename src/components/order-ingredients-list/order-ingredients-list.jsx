import style from './order-ingredients-list.module.css';

export const OrderIngredientsList = ({ dataIngredients }) => {

  return (
    <ul className={style.order_content_list}>
      <li className={style.img_container_bun}>
        <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" className={style.ingredient_img} />
      </li>
      <li className={style.img_container_main_first}>
        <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" className={style.ingredient_img} />
      </li>
      <li className={style.img_container_main_second}>
        <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" className={style.ingredient_img} />
      </li>
      <li className={style.img_container_main_tree}>
        <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" className={style.ingredient_img} />
      </li>
      <li className={style.img_container_main_for}>
        <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" className={style.ingredient_img} />
      </li>
      <li className={style.img_container_main_more}>
        <img src="https://code.s3.yandex.net/react/code/meat-04-mobile.png" className={style.ingredient_img} />
        <p className={`${style.count} text text_type_main-default`}>+3</p>
      </li>
    </ul>
  );
};
