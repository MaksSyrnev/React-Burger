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
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_ITEM, CLOSE_ITEM } from '../../services/actions/ingredient-details';
import { getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/auth';
import {
  LoginPage,
  NotFound404,
  RegisterPage,
  ResetPasswordPage,
  ForgotPasswordPage,
  ProfilePage,
  IngredientPage
} from '../../pages';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const dispatch = useDispatch();
  const dataIngredients = useSelector(store => store.ingredients.items);
  const order = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(getUser());
  }, []);

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
  };

  const handleOpenOrder = () => {
    setTitleModal('');
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  }

  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;

    const closeModal = () => {
      history.replace({ pathname: '/' });
      if (titleModal) {
        dispatch({
          type: CLOSE_ITEM
        });
      }
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

            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>

            <Route path="/" exact>
              <DndProvider backend={HTML5Backend}>
                {dataIngredients && <BurgerIngredients openIngredient={handleOpenIngredient} />}
                <BurgerConstructor openOrder={handleOpenOrder} />
              </DndProvider>
            </Route>

            <ProtectedRoute
              path='/profile/orders/'
              children={<OrderDetails />}
              exact
            />

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
