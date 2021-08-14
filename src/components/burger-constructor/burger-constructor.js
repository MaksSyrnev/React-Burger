import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TotalPrice } from '../total-price/total-price';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_BUN, ADD_MAIN, DELETE_MAIN_ELEMENT } from '../../services/actions/burger-constructor';
import { useDrop } from "react-dnd";

function BurgerConstructor(props) {
  const dataIngredients = useSelector(store => store.ingredients.items);
  const burger = useSelector(store => store.burger);
  const dispatch = useDispatch();

  const [{ isBunHover }, DropBunTarget] = useDrop({
    accept: "bun",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: monitor => ({
      isBunHover: monitor.isOver()
    })
  });

  const [{ isMainHover, itemType, element }, DropMainTarget] = useDrop({
    accept: 'main',
    drop(itemId) {
      console.log("конструктор:", itemId, itemType, element);
      onDropMainHandler(itemId);
    },
    collect: monitor => ({
      isMainHover: monitor.isOver(),
      itemType: monitor.getItemType(),
      element: monitor.getItem(),
    })
  });

  const bunBorderColor = isBunHover ? '#8585ad' : 'transparent';
  const dropBunStyle = {
    border: '1px solid',
    borderColor: bunBorderColor,
  };

  const borderColor = isMainHover ? '#8585ad' : 'transparent';
  const dropMainStyle = {
    border: '1px solid',
    borderColor: borderColor,
  };

  const onDropHandler = (id) => {
    const elementId = id.itemId;
    const element = dataIngredients.filter(item => item._id === elementId);
    console.log(element);
    if (element[0].type === "bun") {
      dispatch({
        type: ADD_BUN,
        item: element[0]
      });
    }
  };

  const onDropMainHandler = (id) => {
    const elementId = id.itemId;
    const element = dataIngredients.filter(item => item._id === elementId);
    console.log(element);
    if (element[0].type !== "bun") {
      dispatch({
        type: ADD_MAIN,
        item: element[0]
      });
    }
  };

  const deleteElementBurger = (id) => {
    dispatch({
      type: DELETE_MAIN_ELEMENT,
      itemId: id
    });
    console.log('работает', id);
  };

  const bunTop = useMemo(
    () => {
      return (burger.top !== undefined) && (burger.top._id !== undefined) ? (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${burger.top.name} (верх)`}
          price={burger.top.price}
          thumbnail={burger.top.image}
        />
      ) : (
        <div className={`${burgerConstructorStyle.text} mt-10`}>
          <p className="text text_type_main-default pt-5 pb-20">
            добавьте булку для бургера
          </p>
        </div>
      )

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
                handleClose={() => deleteElementBurger(item._id)}
              />
            </li>
          )
          )
          }
        </ul>
      ) : (
        <div className={`${burgerConstructorStyle.text} mt-10`}>
          <p className="text text_type_main-default pt-5 pb-15">
            добавьте начинку для бургера
          </p>
        </div>
      )

    }, [burger]);

  function orderHandle() {
    const order = [];
    if ((burger.top !== undefined) && (burger.top._id !== undefined)) {
      order.push(burger.top._id);
    }
    if ((burger.main !== undefined) && (burger.main.length !== 0)) {
      burger.main.forEach(function (item) {
        order.push(item._id);
      });
    }
    props.openOrder(order);
  }

  return (
    <div className={`${burgerConstructorStyle.box} pl-4 pt-25`} >

      <div className={burgerConstructorStyle.conteiner}>
        <div className="ml-8 mr-4 mb-4" ref={DropBunTarget} style={dropBunStyle} >
          {bunTop}
        </div>
        <div style={dropMainStyle} ref={DropMainTarget}>
          {main}
        </div>
        {bunBottom}
      </div>

      <div className={`${burgerConstructorStyle.summary_box} mt-10 mb-10`}>
        <div className={`${burgerConstructorStyle.summary_price} mr-10`}>
          <TotalPrice />
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={orderHandle}>
          Оформить заказ
        </Button>
      </div>

    </div >
  );

}

// const ingredientPropTypes = PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
// });

BurgerConstructor.propTypes = {
  openOrder: PropTypes.func.isRequired
  //   stateBurger: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;
