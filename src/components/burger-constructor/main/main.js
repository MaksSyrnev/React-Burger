import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import mainStyle from './main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { REORDER_MAIN_ELEMENTS, DELETE_MAIN_ELEMENT } from '../../../services/actions/burger-constructor';
import ElementBurger from './element-burger';

export default function Main(props) {
  const burgerMain = useSelector(store => store.burger.main);
  const dispatch = useDispatch();
  const { deleteCountElement } = props;
  const moveElementBurger = useCallback(
    (dragIndex, hoverIndex) => {
      const newBurgerMain = [...burgerMain];
      newBurgerMain.splice(hoverIndex, 0, newBurgerMain.splice(dragIndex, 1)[0]);
      dispatch({ type: REORDER_MAIN_ELEMENTS, payload: newBurgerMain });
    },
    [burgerMain, dispatch]
  );

  const deleteElementBurger = (index, id) => {
    const newBurgerMain = [...burgerMain];
    const element = newBurgerMain[index];
    newBurgerMain.splice(index, 1);
    console.log(element);
    dispatch({
      type: DELETE_MAIN_ELEMENT,
      payload: newBurgerMain
    });
    deleteCountElement(id);
  };

  const renderElementBurger = (item, index) => {
    // console.log(`${item._id}_${index}`);
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

Main.propTypes = {
  deleteCountElement: PropTypes.func.isRequired
};
