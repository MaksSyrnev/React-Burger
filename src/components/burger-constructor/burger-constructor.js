import React, { useContext, useEffect, useState, useMemo } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../utils/ingredients-context';
import { StateBurgerContext } from '../../utils/state-burger-context';
import { TotalPrice } from '../total-price/total-price';

function BurgerConstructor(props) {
  const dataIngredients = useContext(IngredientsContext);
  const [burger, setBurger] = useState({});

  console.log(dataIngredients);
  console.log(burger);

  useEffect(() => {
    if (dataIngredients.length > 0) {

      function elementBurger() {
        return dataIngredients[Math.floor(Math.random() * (dataIngredients.length))];
      }

      function generateBurger() {
        let count = Math.floor(Math.random() * (dataIngredients.length));
        //console.log(count);
        let elementsBurger = { top: {}, main: [] };

        for (let i = 0; i <= count; i = i + 1) {
          let element = elementBurger();
          if (element.type === "bun") {
            elementsBurger.top = element;
          } else {
            elementsBurger.main.push(element);
          }
        }
        //console.log(elementsBurger);
        return elementsBurger;
      }

      const items = generateBurger();
      setBurger(items);
    }
  }, [dataIngredients]);

  const bunTop = useMemo(
    () => {
      return (burger.top !== undefined) && (burger.top._id !== undefined) ? (
        <div className="ml-8 mr-4 mb-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burger.top.name} (верх)`}
            price={burger.top.price}
            thumbnail={burger.top.image}
          />
        </div>
      ) : null

    }, [burger]);

  const bunBottom = useMemo(
    () => {
      return (burger.top !== undefined) && (burger.top._id !== undefined) ? (
        <div className="ml-8 mr-4 mt-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burger.top.name} (низ)`}
            price={burger.top.price}
            thumbnail={burger.top.image}
          />
        </div>
      ) : null

    }, [burger]);

  const main = useMemo(
    () => {
      return (burger.main !== undefined) && (burger.main.length !== 0) ? (
        <ul className={burgerConstructorStyle.list}>
          {burger.main.map((item, index) => (
            <li className={burgerConstructorStyle.list_item} key={`${item._id}_${index}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          )
          )
          }
        </ul>
      ) : null

    }, [burger]);

  function orderDispatch() {
    const order = [];
    if ((burger.top !== undefined) && (burger.top._id !== undefined)) {
      order.push(burger.top._id);
    }
    if ((burger.main !== undefined) && (burger.main.length !== 0)) {
      burger.main.forEach(function (item) {
        order.push(item._id);
      });
    }
    console.log(order);
    props.openOrder(order);
  }

  return (
    <div className={`${burgerConstructorStyle.box} pl-4 pt-25`}>
      <div className={burgerConstructorStyle.conteiner}>
        {bunTop}
        {main}
        {bunBottom}
      </div>
      <StateBurgerContext.Provider value={burger}>
        <div className={`${burgerConstructorStyle.summary_box} mt-10 mb-10`}>
          <div className={`${burgerConstructorStyle.summary_price} mr-10`}>
            <TotalPrice />
            {/* <p className="text text_type_digits-medium">
              610
            </p> */}
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={orderDispatch}>
            Оформить заказ
          </Button>
        </div>
      </StateBurgerContext.Provider>
    </div >
  )

}

// const ingredientPropTypes = PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
// });

// BurgerConstructor.propTypes = {
//   stateBurger: PropTypes.arrayOf(ingredientPropTypes).isRequired
// };

export default BurgerConstructor;
