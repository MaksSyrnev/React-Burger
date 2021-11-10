import React, { useRef } from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Ingredient } from '../ingredient/ingredient';
import { useSelector } from 'react-redux';
import { TPropsBurgerIngridients, TItemIngridient } from '../../services/types';

function BurgerIngredients(props: TPropsBurgerIngridients) {

  const [currentTab, setCurrentTab] = React.useState<string>('one');
  const data: Array<TItemIngridient> = useSelector((store: any) => store.ingredients.items);
  const ingredientsBoxRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const handleClickTab = (e: string) => {
    setCurrentTab(e);
  };

  const handleScroll = () => {
    if (ingredientsBoxRef.current && bunRef.current && sauceRef.current && mainRef.current) {
      const ingredientsBoxRefPosition: number = ingredientsBoxRef.current.getBoundingClientRect().top;
      const bunRefPosition: number = bunRef.current.getBoundingClientRect().top;
      const sauceRefPosition: number = sauceRef.current.getBoundingClientRect().top;
      const mainRefPosition: number = mainRef.current.getBoundingClientRect().top;

      const bunDiff: number = Math.abs(ingredientsBoxRefPosition - bunRefPosition);
      const sauceDiff: number = Math.abs(ingredientsBoxRefPosition - sauceRefPosition);
      const mainDiff: number = Math.abs(ingredientsBoxRefPosition - mainRefPosition);

      if (bunDiff < sauceDiff) {
        setCurrentTab("one");
      } else if (sauceDiff < mainDiff) {
        setCurrentTab("two");
      } else {
        setCurrentTab("three");
      }
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
