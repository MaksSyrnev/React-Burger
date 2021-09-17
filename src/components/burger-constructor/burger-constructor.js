import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TotalPrice } from '../total-price/total-price';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_BUN, ADD_MAIN } from '../../services/actions/burger-constructor';
import { ADD_COUNT_INGRIDIENT, DELETE_COUNT_BUN } from '../../services/actions/burger-ingredients';
import { useDrop } from "react-dnd";
import Main from './main/main';
import { useHistory } from 'react-router-dom';
import { getCookie } from '../../services/utils';
import { orderPost } from '../../services/actions/order-details';

function BurgerConstructor(props) {
  const dataIngredients = useSelector(store => store.ingredients.items);
  const burger = useSelector(store => store.burger);
  const user = useSelector(store => store.user);
  const order = useSelector(store => store.order);
  const dispatch = useDispatch();
  const history = useHistory();

  //принятие дропа элемента булка
  const [{ isBunHover }, DropBunTarget] = useDrop({
    accept: "bun",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: monitor => ({
      isBunHover: monitor.isOver()
    })
  });

  //принятие дропа эелементов начинки
  const [{ isMainHover, }, DropMainTarget] = useDrop({
    accept: 'main',
    drop(itemId) {
      onDropMainHandler(itemId);
    },
    collect: monitor => ({
      isMainHover: monitor.isOver()
    })
  });

  //обработчик события дропа для булки (логика)
  const onDropHandler = (id) => {
    const elementId = id.itemId;
    const element = dataIngredients.filter(item => item._id === elementId);
    if (element[0].type === "bun") {
      dispatch({
        type: ADD_BUN,
        item: element[0]
      });
      dispatch({
        type: DELETE_COUNT_BUN,
        id: elementId,
        count: 0
      });
      dispatch({
        type: ADD_COUNT_INGRIDIENT,
        id: elementId,
        count: element[0].count + 2
      });
    }
  };

  //обработчик события дропа для начинки (логика)
  const onDropMainHandler = (id) => {
    const elementId = id.itemId;
    if (elementId !== undefined) {
      const element = dataIngredients.filter(item => item._id === elementId);
      if (element[0].type !== "bun") {
        dispatch({
          type: ADD_MAIN,
          item: element[0]
        });
        dispatch({
          type: ADD_COUNT_INGRIDIENT,
          id: elementId,
          count: element[0].count + 1
        });
      }
    }
  };

  const deleteCountElement = (id) => {
    const element = dataIngredients.filter(item => item._id === id);
    console.log(element);
    dispatch({
      type: ADD_COUNT_INGRIDIENT,
      id: id,
      count: element[0].count - 1
    });
  };

  //подсветка зоны дропа для булок
  const bunBorderColor = isBunHover ? '#8585ad' : 'transparent';
  const dropBunStyle = {
    border: '1px solid',
    borderColor: bunBorderColor,
  };

  //подсветка зоны дропа для начинки
  const borderColor = isMainHover ? '#8585ad' : 'transparent';
  const dropMainStyle = {
    border: '1px solid',
    borderColor: borderColor,
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

  //обработчик кнопки отправки заказа
  const orderHandle = () => {
    const token = getCookie('token');
    if (!token) {
      history.replace({ pathname: '/login' });
    } else {
      //вариант когда есть токен
      //собираем заказ
      const orderList = [];
      if ((burger.top !== undefined) && (burger.top._id !== undefined)) {
        orderList.push(burger.top._id);
      }
      if ((burger.main !== undefined) && (burger.main.length !== 0)) {
        burger.main.forEach(function (item) {
          orderList.push(item._id);
        });
      }
      dispatch(orderPost(orderList));
      props.openOrder();
    }
  };

  return (
    <div className={`${burgerConstructorStyle.box} pl-4 pt-25`} >

      <div className={burgerConstructorStyle.conteiner}>
        <div className="ml-8 mr-4 mb-4" ref={DropBunTarget} style={dropBunStyle} >
          {bunTop}
        </div>
        <div style={dropMainStyle} ref={DropMainTarget}>
          {(burger.main !== undefined) && (burger.main.length !== 0) ? (
            <Main deleteCountElement={deleteCountElement} />
          ) : (
            <div className={`${burgerConstructorStyle.text} mt-10`}>
              <p className="text text_type_main-default pt-5 pb-15">
                добавьте начинку для бургера
              </p>
            </div>
          )}
        </div>
        {bunBottom}
      </div>

      <div className={`${burgerConstructorStyle.summary_box} mt-10 mb-10`}>
        <div className={`${burgerConstructorStyle.summary_price} mr-10`}>
          <TotalPrice />
          <CurrencyIcon type="primary" />
        </div>
        {(burger.top._id !== undefined) && (
          <Button type="primary" size="medium" onClick={orderHandle}>
            Оформить заказ
          </Button>
        )}
      </div>

    </div >
  );

}

BurgerConstructor.propTypes = {
  openOrder: PropTypes.func.isRequired
  //   stateBurger: PropTypes.arrayOf(ingredientPropTypes).isRequired
};

export default BurgerConstructor;
