import React, { useContext } from 'react';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../utils/ingredients-context';

function BurgerConstructor(props) {
  const state = useContext(IngredientsContext);
  //const state = props.stateBurger;

  return (
    <div className={`${burgerConstructorStyle.box} pl-4 pt-25`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="ml-8 mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price="1255"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>

        <ul className={burgerConstructorStyle.list}>

          {state.map((item, index) => (
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

        <div className="ml-8 mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price="1255"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>

      </div>

      <div className={`${burgerConstructorStyle.summary_box} mt-10 mb-10`}>
        <div className={`${burgerConstructorStyle.summary_price} mr-10`}>
          <p className="text text_type_digits-medium">
            610
          </p>
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
