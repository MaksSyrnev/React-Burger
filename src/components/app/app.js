import React, { useEffect } from 'react';
import appStyle from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../utils/ingredients-context';


function App() {

  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [dataIngredients, setDataIngredients] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const [currentIngredients, setCurrentIngredients] = React.useState({});

  useEffect(() => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        const data = res.data;
        setDataIngredients(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  const handleOpenOrder = () => {
    setTitleModal('');
    setIsOpen(true);
  };

  const handleOpenIngredient = (idIngridient) => {
    const currentIngredients = dataIngredients.filter(
      (item) => item._id === idIngridient
    );
    const current = currentIngredients[0];
    setTitleModal('Детали ингредиента');
    setCurrentIngredients(current);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const modal = (
    <Modal onClose={closePopup} title={titleModal}>
      {titleModal ? <IngredientDetails current={currentIngredients} /> : <OrderDetails />}
    </Modal >
  );
  //data={dataIngredients} stateBurger={dataIngredients}
  return (
    <div className={appStyle.page}>
      <AppHeader />
      <IngredientsContext.Provider value={dataIngredients}>
        <main className={appStyle.content}>
          <BurgerIngredients openIngredient={handleOpenIngredient} />
          <BurgerConstructor openOrder={handleOpenOrder} />
        </main>
      </IngredientsContext.Provider>

      {isOpen && modal}
    </div >
  );
}

export default App;
