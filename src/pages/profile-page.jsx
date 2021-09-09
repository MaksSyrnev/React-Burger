import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import styles from './page.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../services/actions/auth';
import { UserInfo } from '../components/user/user';

export function ProfilePage() {
  const { path } = useRouteMatch();
  const history = useHistory();

  const activeProfile = path === '/profile' ? styles.button_menu_active : '';

  const goUserInfo = () => {
    history.replace({ pathname: '/profile' });
  };

  const goOrders = () => {
    history.replace({ pathname: '/profile/orders' });
  };

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
              <button className={`${styles.button_menu} text text_type_main-medium text_color_inactive `} onClick={goOrders}>
                История заказов
              </button>
            </li>
            <li className={styles.menu_link} >
              <button className={`${styles.button_menu} text text_type_main-medium text_color_inactive`}>
                Выход
              </button>
            </li>
          </ul>

          <p className={`${styles.text_profile} text text_type_main-default`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>

        </div>

        <div>
          <Switch>
            <Route path={`${path}/orders`} >
              <p>Здесь будут заказы</p>
            </Route>
            <Route path={`${path}/orders/:id`}>
              <p>информация про заказ</p>
            </Route>
            <Route path={path}>
              <UserInfo />
            </Route>
          </Switch>
        </div>

      </div >
    </div >
  );
}
