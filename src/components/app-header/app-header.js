import React from 'react';
import appHeaderStyle from './app-header.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const activeConstructor = pathname === '/' ? '' : 'text_color_inactive';
  const activeProfile = pathname === '/profile' ? '' : 'text_color_inactive';
  const activeFeed = pathname === '/feed' ? '' : 'text_color_inactive';

  const goToHome = () => {
    history.replace({ pathname: '/' });
  };

  const goToFeed = () => {
    history.replace({ pathname: '/feed' });
  };

  const goToPropfile = () => {
    history.replace({ pathname: '/profile' });
  };

  return (
    <header className={appHeaderStyle.header}>
      <nav className={appHeaderStyle.nav_panel}>
        <ul className={appHeaderStyle.button_list}>
          <li className="mr-2">
            <button className={appHeaderStyle.button_menu} onClick={goToHome}>
              <div className={`${appHeaderStyle.button} pl-5 pr-5 pb-4 pt-4`}>
                <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
                <div className={`pl-2 text text_type_main-default ${activeConstructor}`}>Конструктор</div>
              </div>
            </button>
          </li>

          <li>
            <button className={appHeaderStyle.button_menu} onClick={goToFeed}>
              <div className={`${appHeaderStyle.button} pl-5 pr-5 pb-4 pt-4`}>
                <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
                <div className={`pl-2 text text_type_main-default ${activeFeed}`}>Лента заказов</div>
              </div>
            </button>
          </li>
        </ul>

        <div className={appHeaderStyle.logo}>
          <Logo />
        </div>

        <button className={appHeaderStyle.button_menu} onClick={goToPropfile}>
          <div className={`${appHeaderStyle.button} pl-5 pr-5 pb-4 pt-4`}>
            <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
            <div className={`${appHeaderStyle.button} pl-2 text text_type_main-default ${activeProfile}`}>
              Личный кабинет
            </div>
          </div>
        </button>
      </nav>
    </header >
  )
}

export default AppHeader;
