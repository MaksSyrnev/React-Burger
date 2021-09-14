import ingredientStyle from './ingredient.module.css';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { Link, useLocation, useHistory } from 'react-router-dom';

export default function Ingredient(props) {
  const item = props.item;
  const itemId = item._id;
  const count = item.count;

  const location = useLocation();
  const ingredientId = itemId;

  const [{ isDrag, itemType, element }, dragRef] = useDrag({
    type: item.type === 'bun' ? 'bun' : 'main',
    item: { itemId },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      itemType: monitor.getItemType(),
      element: monitor.getItem(),
    })
  });

  function handleClickIngredient() {
    const i = item._id;
    props.openIngredient(i);
  }

  return (!isDrag &&
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={ingredientStyle.link}
    >

      <li className={`${ingredientStyle.product_item} ml-4 pr-2`} >
        <div className={ingredientStyle.product_card} onClick={handleClickIngredient} ref={dragRef} >
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
          {(count > 0) && <Counter count={count} size="default" />}
        </div>
      </li>
    </Link>
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
