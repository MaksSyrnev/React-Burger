import React, { useCallback } from 'react';
import mainStyle from './main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { REORDER_MAIN_ELEMENTS, DELETE_MAIN_ELEMENT } from '../../../services/actions/burger-constructor';
import ElementBurger from './element-burger';

export default function Main() {
  const burgerMain = useSelector(store => store.burger.main);
  const dispatch = useDispatch();

  const moveElementBurger = useCallback(
    (dragIndex, hoverIndex) => {
      const newBurgerMain = [...burgerMain];
      newBurgerMain.splice(hoverIndex, 0, newBurgerMain.splice(dragIndex, 1)[0]);
      dispatch({ type: REORDER_MAIN_ELEMENTS, payload: newBurgerMain });
    },
    [burgerMain, dispatch]
  );

  const deleteElementBurger = (index) => {
    const newBurgerMain = [...burgerMain];
    newBurgerMain.splice(index, 1);
    console.log(newBurgerMain);
    dispatch({
      type: DELETE_MAIN_ELEMENT,
      payload: newBurgerMain
    });
  };

  const renderElementBurger = (item, index) => {
    console.log(`${item._id}_${index}`);
    return (
      <ElementBurger
        key={`${item._id}_${index}`}
        index={index}
        id={item._id}
        item={item}
        moveElementBurger={moveElementBurger}
        deleteElementBurger={deleteElementBurger}
      />
    );
  };

  return (
    <ul className={mainStyle.list}>
      {burgerMain.map((item, index) => renderElementBurger(item, index))}
    </ul>
  );
}
