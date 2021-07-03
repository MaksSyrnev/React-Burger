import React from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('one');
  const { data } = props;

  const handleClickTab = (e) => {
    setCurrent(e);
  };



  const ingredientPropTypes = PropTypes.shape({
    _id: PropTypes.symbol.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  });

  const Ingredient = ({ item, index }) => {

    const handleClickIngredient = () => {
      props.onOpen(item);
    }

    return (
      <li className={`${burgerIngredientsStyle.product_item} ml-4 pr-2`} key={`${item._id}_${index}`}>
        <div className={burgerIngredientsStyle.product_card} onClick={handleClickIngredient}>
          <img src={item.image} alt={item.name} className="pl-4 pr-4" />
          <div className={`${burgerIngredientsStyle.price} `}>
            <p className={`pb-1 pt-1 text text_type_digits-default`} >
              {item.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${burgerIngredientsStyle.description} text text_type_main-default`}>
            {item.name}
          </p>
          <Counter count={1} size="default" />
        </div>
      </li>
    );
  };

  BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropTypes),
  };

  return (
    <section className={`${burgerIngredientsStyle.box} mr-10`}>
      <h2 className="pb-5 pt-10 text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: 'flex' }} >
        <Tab value="one" active={current === 'one'} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={handleClickTab}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>

      <div className={burgerIngredientsStyle.ingredients_box}>

        <h3 className="text text_type_main-medium mt-10 pb-6">Булки</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "bun") {
              return (
                <Ingredient item={item} index={index} />
              );
            }
          })}
        </ul>

        <h3 className="text text_type_main-medium mt-10 pb-6">Соусы</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "sauce") {
              return (
                <Ingredient item={item} index={index} />
              );
            }
          })}
        </ul>

        <h3 className="text text_type_main-medium mt-10 pb-6">Начинка</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "main") {
              return (
                <Ingredient item={item} index={index} />
              );
            }
          })}
        </ul>
      </div>

    </section>
  )

}

export default BurgerIngredients;
