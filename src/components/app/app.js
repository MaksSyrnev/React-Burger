import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import appStyle from './app.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_ITEM, CLOSE_ITEM } from '../../services/actions/ingredient-details';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { orderPost } from '../../services/actions/order-details';
import { LoginPage, NotFound404, RegisterPage, ResetPasswordPage, ForgotPasswordPage, ProfilePage, IngredientPage } from '../../pages';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const dispatch = useDispatch();
  const dataIngredients = useSelector(store => store.ingredients.items);
  const order = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  const handleOpenOrder = (order) => {
    setTitleModal('');
    dispatch(orderPost(order));
    setIsOpen(true);
  };

  const handleOpenIngredient = (idIngridient) => {
    const currentIngredients = dataIngredients.filter(
      (item) => item._id === idIngridient
    );
    const current = currentIngredients[0];
    setTitleModal('Детали ингредиента');
    dispatch({
      type: OPEN_ITEM,
      item: current
    });
    setIsOpen(true);
  };

  const closePopup = () => {
    if (titleModal) {
      dispatch({
        type: CLOSE_ITEM
      });
    }
    setIsOpen(false);
  };

  const modal = (
    <Modal onClose={closePopup} title={titleModal}>
      {titleModal ? <IngredientDetails /> : <OrderDetails orderNumber={order.number} />}
    </Modal >
  );

  return (
    <div className={appStyle.page}>
      <BrowserRouter>
        <AppHeader />
        <main className={appStyle.content}>

          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPasswordPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/" exact>
              <DndProvider backend={HTML5Backend}>
                {dataIngredients && <BurgerIngredients openIngredient={handleOpenIngredient} />}
                <BurgerConstructor openOrder={handleOpenOrder} />
              </DndProvider>
            </Route>
            <Route path={`/ingredients/:id`} exact>
              <IngredientPage />
            </Route>
            <Route>
              <NotFound404 />
            </Route>

          </Switch>

        </main>
      </BrowserRouter>
      {isOpen && modal}
    </div >
  );
}

export default App;
