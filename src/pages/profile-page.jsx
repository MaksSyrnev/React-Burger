import { Switch, Route, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import styles from './page.module.css';
import { UserInfo } from '../components/user-info/user-info';
import { logoutUser } from '../services/actions/auth';
import { deleteCookie } from '../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import OrdersHistory from '../components/orders-history/orders-history';
import ItemOrdersHistory from '../components/item-orders-history/item-orders-history';

export function ProfilePage() {
  const { pathname } = useLocation();
  const { path } = useRouteMatch();
  const history = useHistory();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const activeProfile = pathname === '/profile' ? styles.button_menu_active : '';
  const activeOrders = pathname === '/profile/orders' ? styles.button_menu_active : '';
  const logoutStatus = user.logout.feedStatus;

  const goUserInfo = () => {
    history.replace({ pathname: '/profile' });
  };

  const goOrders = () => {
    history.replace({ pathname: '/profile/orders' });
  };

  const logoutUserHandeler = useCallback(
    () => {
      dispatch(logoutUser());
    }, [dispatch]
  );

  useEffect(() => {
    if (logoutStatus) {
      deleteCookie('refreshToken');
      deleteCookie('token');
      history.replace({ pathname: '/login' });
    }
  }, [history, logoutStatus]);

  return (
    <div className={styles.wrapper_profile}>
      <div className={styles.container_profile}>
        <div className={`${styles.nav_box} mr-15`}>

          <ul className={`${styles.navigation} mb-20`}>
            <li className={styles.menu_link}>
              <button className={`${styles.button_menu} text text_type_main-medium text_color_inactive ${activeProfile}`} onClick={goUserInfo} >
                Профиль
              </button>
            </li>
            <li className={styles.menu_link} >
              <button className={`${styles.button_menu} text text_type_main-medium text_color_inactive ${activeOrders} `} onClick={goOrders}>
                История заказов
              </button>
            </li>
            <li className={styles.menu_link} >
              <button className={`${styles.button_menu} text text_type_main-medium text_color_inactive`} onClick={logoutUserHandeler}>
                Выход
              </button>
            </li>
          </ul>

          <p className={`${styles.text_profile} text text_type_main-default`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>

        </div>

        <div>
          {(pathname === '/profile') && <UserInfo />}
          {(pathname === '/profile/orders') && <OrdersHistory />}

          {/* <Switch>
            <Route path={`${path}/orders`} exact>
              <OrdersHistory />
            </Route>
            <Route path={`${path}/orders/:id`}>
              <ItemOrdersHistory />
            </Route>
            <Route path="/profile" exact>
              <UserInfo />
            </Route>
          </Switch> */}
        </div>

      </div >
    </div >
  );
}
