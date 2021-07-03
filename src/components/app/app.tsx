import React, { useEffect } from 'react';
import appStyle from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {

  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const [dataIngredients, setDataIngredients] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState({});

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

  const handleClickOpenOrder = () => {
    setTitleModal('');
    setIsOpen(true);
  };

  function handleClickOpenIngredient(i: React.SetStateAction<{}>) {
    setTitleModal('Детали ингредиента');
    setSelectedItem(i);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const modal = (
    <ModalOverlay onClose={closePopup}>
      <Modal onClose={closePopup} title={titleModal}>
        {titleModal ? <IngredientDetails item={selectedItem} /> : <OrderDetails />}
      </Modal >
    </ModalOverlay>
  );

  return (
    <div className={appStyle.page}>
      <AppHeader />
      <main className={appStyle.content}>
        <BurgerIngredients data={dataIngredients} onOpen={handleClickOpenIngredient} />
        <BurgerConstructor stateBurger={dataIngredients} onOpen={handleClickOpenOrder} />
      </main>

      {isOpen && modal}
    </div >
  );
}

export default App;
