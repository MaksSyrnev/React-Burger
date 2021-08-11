import ingredientStyle from './ingredient.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export default function Ingredient(props) {

  const item = props.item;
  let count = 0;

  function handleClickIngredient() {
    const i = item._id;
    props.openIngredient(i);
  }

  return (
    <li className={`${ingredientStyle.product_item} ml-4 pr-2`} >
      <div className={ingredientStyle.product_card} onClick={handleClickIngredient}>
        <img src={item.image} alt={item.name} className="pl-4 pr-4" />
        <div className={`${ingredientStyle.price} `}>
          <p className={`pb-1 pt-1 text text_type_digits-default`} >
            {item.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${ingredientStyle.description} text text_type_main-default`}>
          {item.name}
        </p>
        {count && <Counter count={count} size="default" />}
      </div>
    </li>
  );
};

Ingredient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }),
  openIngredient: PropTypes.func.isRequired
};
