import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import appStyle from './app.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { OPEN_ITEM, CLOSE_ITEM } from '../../services/actions/ingredient-details';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/auth';
import ItemOrdersHistory from '../item-orders-history/item-orders-history';
import {
  LoginPage,
  NotFound404,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
  IngredientPage,
  FeedPage,
  FeedItemPage,
  OrdersHistoryItemPage
} from '../../pages';

import { TEmptyFunc, TBurgerItem, TLocataionState } from '../../services/types/types';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>('');
  const dispatch = useDispatch();
  const dataIngredients = useSelector(store => store.ingredients.items);
  const order = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(getUser());
  }, []);

  const handleOpenIngredient = (idIngridient: string): void => {
    const currentIngredients = dataIngredients.filter(
      (item) => item._id === idIngridient
    );
    const current = currentIngredients[0];
    setTitleModal('Детали ингредиента');
    dispatch({
      type: OPEN_ITEM,
      item: current
    });
  };

  const handleOpenOrder: TEmptyFunc = () => {
    setTitleModal('');
    setIsOpen(true);
  };

  const closePopup: TEmptyFunc = () => {
    setIsOpen(false);
  }

  const ModalSwitch = () => {
    const location = useLocation<TLocataionState>();
    const history = useHistory<TLocataionState>();
    let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

    const closeModal: TEmptyFunc = () => {
      history.replace({ pathname: '/' });
      if (titleModal) {
        dispatch({
          type: CLOSE_ITEM
        });
      }
    };

    const closeModalOrderFeed: TEmptyFunc = () => {
      history.replace({ pathname: '/feed' });
    };

    const closeModalOrderHistory: TEmptyFunc = () => {
      history.replace({ pathname: '/profile/orders' });
    };

    return (
      <>
        <AppHeader />
        <main className={appStyle.content}>

          <Switch location={background || location}>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPasswordPage />
            </Route>
            <Route path="/feed" exact>
              <FeedPage />
            </Route>
            <Route path={`/feed/:id`} exact>
              <FeedItemPage />
            </Route>

            <ProtectedRoute path="/profile" exact >
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path={`/profile/orders/:id`} exact>
              <OrdersHistoryItemPage />
            </ProtectedRoute>

            <Route path="/" exact>
              <DndProvider backend={HTML5Backend}>
                {dataIngredients && <BurgerIngredients openIngredient={handleOpenIngredient} />}
                <BurgerConstructor openOrder={handleOpenOrder} />
              </DndProvider>
            </Route>

            <Route path={`/ingredients/:ingredientId`} exact>
              <IngredientPage />
            </Route>

            <Route>
              <NotFound404 />
            </Route>

          </Switch>
        </main>

        {background && (
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal onClose={closeModal} title={titleModal} >
                <IngredientDetails />
              </Modal>
            }
          />
        )}

        {background && (
          <Route
            path='/feed/:id'
            children={
              <Modal onClose={closeModalOrderFeed}>
                <ItemOrdersHistory />
              </Modal>
            }
          />
        )}

        {background && (
          <Route
            path='/profile/orders/:id'
            children={
              <Modal onClose={closeModalOrderHistory}>
                <ItemOrdersHistory />
              </Modal>
            }
          />
        )}

      </>
    );

  };

  const modal = (
    <Modal onClose={closePopup} >
      <OrderDetails orderNumber={order.number} />
    </Modal >
  );

  return (
    <div className={appStyle.page}>
      <BrowserRouter>
        <ModalSwitch />
      </BrowserRouter>
      {isOpen && modal}
    </div >
  );
}

export default App;
