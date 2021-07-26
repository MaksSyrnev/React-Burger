import React, { useContext, useState } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../utils/ingredients-context';
import { TotalPrice } from '../total-price/total-price';

function BurgerConstructor(props) {
  const ingredientsData = useContext(IngredientsContext);
  const [stateBurger, setStateBurger] = useState([]);


  return (
    <div className={`${burgerConstructorStyle.box} pl-4 pt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stateBurger.map((item) => {
          if (item.type === "bun") {
            return (
              <div className="ml-8 mr-4">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            )
          }
        }
        )}
        <ul className={burgerConstructorStyle.list}>

          {stateBurger.map((item, index) => (
            <li className={burgerConstructorStyle.list_item} key={`${item._id}_${index}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          )
          )}

        </ul>

        {stateBurger.map((item) => {
          if (item.type === "bun") {
            return (
              <div className="ml-8 mr-4">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            )
          }
        }
        )}
      </div>

      <div className={`${burgerConstructorStyle.summary_box} mt-10 mb-10`}>
        <div className={`${burgerConstructorStyle.summary_price} mr-10`}>
          <TotalPrice stateBurger={stateBurger} />
          {/* <p className="text text_type_digits-medium">
            610
          </p>*/}
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={props.openOrder}>
          Оформить заказ
        </Button>
      </div>

    </div >
  )

}

const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerConstructor.propTypes = {
  stateBurger: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;
