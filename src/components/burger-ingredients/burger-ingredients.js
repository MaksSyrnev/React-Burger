import React, { useRef } from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';

function BurgerIngredients(props) {

  const [currentTab, setCurrentTab] = React.useState('one');
  const data = useSelector(store => store.ingredients.items);
  const ingredientsBoxRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleClickTab = (e) => {
    setCurrentTab(e);
  };

  const handleScroll = () => {
    const ingredientsBoxRefPosition = ingredientsBoxRef.current.getBoundingClientRect().top;
    const bunRefPosition = bunRef.current.getBoundingClientRect().top;
    const sauceRefPosition = sauceRef.current.getBoundingClientRect().top;
    const mainRefPosition = mainRef.current.getBoundingClientRect().top;

    const bunDiff = Math.abs(ingredientsBoxRefPosition - bunRefPosition);
    const sauceDiff = Math.abs(ingredientsBoxRefPosition - sauceRefPosition);
    const mainDiff = Math.abs(ingredientsBoxRefPosition - mainRefPosition);

    if (bunDiff < sauceDiff) {
      setCurrentTab("one");
    } else if (sauceDiff < mainDiff) {
      setCurrentTab("two");
    } else {
      setCurrentTab("three");
    }
  };

  return (
    <section className={`${burgerIngredientsStyle.box} mr-10`}>
      <h2 className="pb-5 pt-10 text text_type_main-large">Соберите бургер</h2>
      <div style={{ display: 'flex' }} >
        <Tab value="one" active={currentTab === 'one'} onClick={handleClickTab}>
          Булки
        </Tab>
        <Tab value="two" active={currentTab === 'two'} onClick={handleClickTab}>
          Соусы
        </Tab>
        <Tab value="three" active={currentTab === 'three'} onClick={handleClickTab}>
          Начинки
        </Tab>
      </div>

      {<div className={burgerIngredientsStyle.ingredients_box} ref={ingredientsBoxRef} onScroll={handleScroll}>

        <h3 className="text text_type_main-medium mt-10 pb-6" ref={bunRef}>Булки</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "bun") {
              return <Ingredient item={item} openIngredient={props.openIngredient} key={`${item._id}_${index}`} />
            } else {
              return null;
            }
          })}
        </ul>

        <h3 className="text text_type_main-medium mt-10 pb-6" ref={sauceRef}>Соусы</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "sauce") {
              return <Ingredient item={item} openIngredient={props.openIngredient} key={`${item._id}_${index}`} />
            } else {
              return null;
            }
          })}
        </ul>

        <h3 className="text text_type_main-medium mt-10 pb-6" ref={mainRef}>Начинка</h3>
        <ul className={`${burgerIngredientsStyle.product_list}`}>
          {data.map(function (item, index) {
            if (item.type === "main") {
              return <Ingredient item={item} openIngredient={props.openIngredient} key={`${item._id}_${index}`} />
            } else {
              return null;
            }
          })}
        </ul>
      </div>}
    </section>
  );

}

BurgerIngredients.propTypes = {
  openIngredient: PropTypes.func.isRequired
};

export default BurgerIngredients;


// const ingredientPropTypes = PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
// });
// data: PropTypes.arrayOf(ingredientPropTypes).isRequired,
