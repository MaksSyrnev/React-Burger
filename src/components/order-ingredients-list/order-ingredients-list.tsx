import { FC } from 'react';
import style from './order-ingredients-list.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/types/hooks';
import { TItemIngridient } from '../../services/types/types';

interface IIngredientsList {
  dataIngredients: string[];
}

export const OrderIngredientsList: FC<IIngredientsList> = ({ dataIngredients }) => {
  const data: Array<TItemIngridient> = useSelector(store => store.ingredients.items);

  const oneElement = data.filter(element => element._id === dataIngredients[0]);
  const twoElement = dataIngredients.length > 1 ?
    data.filter(element => element._id === dataIngredients[1])
    : null;
  const treeElement = (dataIngredients.length > 3) ?
    data.filter(element => element._id === dataIngredients[2])
    : null;
  const forElement = (dataIngredients.length > 4) ?
    data.filter(element => element._id === dataIngredients[3])
    : null;
  const fiveElement = (dataIngredients.length > 5) ?
    data.filter(element => element._id === dataIngredients[4])
    : null;
  const sixElement = (dataIngredients.length > 6) ?
    data.filter(element => element._id === dataIngredients[5])
    : null;

  let total: number = 0;
  dataIngredients.forEach(function (item) {
    const ingredientData = data.filter(element => element._id === item);
    if (ingredientData[0] !== undefined) {
      total = ingredientData[0].type === "bun" ? total + ingredientData[0].price * 2 : total + ingredientData[0].price;
    }
  });

  return (
    <div className={style.box}>
      <ul className={style.order_content_list}>
        {(oneElement !== null) && ((oneElement[0] !== undefined) && <li className={style.img_container_bun}>
          <img src={oneElement[0].image_mobile} alt={oneElement[0].name} className={style.ingredient_img} />
        </li>)}
        {(twoElement !== null) && ((twoElement[0] !== undefined) && <li className={style.img_container_main_first}>
          <img src={twoElement[0].image_mobile} alt={twoElement[0].name} className={style.ingredient_img} />
        </li>)}
        {(treeElement !== null) && ((treeElement[0] !== undefined) && <li className={style.img_container_main_second}>
          <img src={treeElement[0].image_mobile} alt={treeElement[0].name} className={style.ingredient_img} />
        </li>)}
        {(forElement !== null) && ((forElement[0] !== undefined) && <li className={style.img_container_main_tree}>
          <img src={forElement[0].image_mobile} alt={forElement[0].name} className={style.ingredient_img} />
        </li>)}
        {(fiveElement !== null) && ((fiveElement[0] !== undefined) && <li className={style.img_container_main_for}>
          <img src={fiveElement[0].image_mobile} alt={fiveElement[0].name} className={style.ingredient_img} />
        </li>)}
        {(sixElement !== null) && ((sixElement[0] !== undefined) && <li className={style.img_container_main_more}>
          <img src={sixElement[0].image_mobile} alt={sixElement[0].name} className={style.ingredient_img} />
          <p className={`${style.count} text text_type_main-default`}>+{dataIngredients.length - 5}</p>
        </li>)}
      </ul>

      <div className={style.order_price}>
        <div className={style.price}>
          <p className={`{style.number} text text_type_digits-default`}>{total}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>

    </div>
  );
};
