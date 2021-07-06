import React from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';

function BurgerIngredients(props) {

  const [current, setCurrent] = React.useState('one');
  const { data } = props;

  const handleClickTab = (e) => {
    setCurrent(e);
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
              return <Ingredient item={item} openIngredient={props.openIngredient} key={`${item._id}_${index}`} />
            } else {
              return null;
            }
          })}
        </ul>

        <h3 className="text text_type_main-medium mt-10 pb-6">Соусы</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "sauce") {
              return <Ingredient item={item} openIngredient={props.openIngredient} key={`${item._id}_${index}`} />
            } else {
              return null;
            }
          })}
        </ul>

        <h3 className="text text_type_main-medium mt-10 pb-6">Начинка</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "main") {
              return <Ingredient item={item} openIngredient={props.openIngredient} key={`${item._id}_${index}`} />
            } else {
              return null;
            }
          })}
        </ul>
      </div>

    </section>
  )

}

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};

export default BurgerIngredients;
