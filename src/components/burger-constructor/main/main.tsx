import React, { useCallback } from 'react';
//import PropTypes from 'prop-types';
import mainStyle from './main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { REORDER_MAIN_ELEMENTS, DELETE_MAIN_ELEMENT } from '../../../services/actions/burger-constructor';
import ElementBurger from './element-burger';
import { TItemIngridient } from '../../../services/types';
type TMainProps = {
  deleteCountElement: (id: string) => void;
};

export default function Main(props: TMainProps) {
  const burgerMain: Array<TItemIngridient> = useSelector((store: any) => store.burger.main);
  const dispatch = useDispatch();
  const { deleteCountElement } = props;
  const moveElementBurger = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newBurgerMain: Array<TItemIngridient> = [...burgerMain];
      newBurgerMain.splice(hoverIndex, 0, newBurgerMain.splice(dragIndex, 1)[0]);
      dispatch({ type: REORDER_MAIN_ELEMENTS, payload: newBurgerMain });
    },
    [burgerMain, dispatch]
  );

  const deleteElementBurger = (index: number, id: string) => {
    const newBurgerMain: Array<TItemIngridient> = [...burgerMain];
    //const element: TItemIngridient = newBurgerMain[index]; для вывода в консоль элемента который удаляем
    newBurgerMain.splice(index, 1);
    dispatch({
      type: DELETE_MAIN_ELEMENT,
      payload: newBurgerMain
    });
    deleteCountElement(id);
  };

  const renderElementBurger = (item: TItemIngridient, index: number) => {
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

// Main.propTypes = {
//   deleteCountElement: PropTypes.func.isRequired
// };
