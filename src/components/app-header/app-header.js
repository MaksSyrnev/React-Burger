import React from 'react';
import appHeaderStyle from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={appHeaderStyle.header}>
      <nav className={appHeaderStyle.nav_panel}>
        <ul className={appHeaderStyle.button_list}>
          <li className="mr-2">
            <div className={`${appHeaderStyle.button} pl-5 pr-5 pb-4 pt-4`}>
              <BurgerIcon type="primary" />
              <div className="pl-2 text text_type_main-default">Конструктор</div>
            </div>
          </li>
          <li>
            <div className={`${appHeaderStyle.button} pl-5 pr-5 pb-4 pt-4`}>
              <ListIcon type="secondary" />
              <div className="pl-2 text text_type_main-default text_color_inactive">Лента заказов</div>
            </div>
          </li>
        </ul>
        <div className={appHeaderStyle.logo}>
          <Logo />
        </div>
        <div className={`${appHeaderStyle.button} pl-5 pr-5 pb-4 pt-4`}>
          <ProfileIcon type="secondary" />
          <div className={`{appHeaderStyle.active_button} pl-2 text text_type_main-default text_color_inactive`}>Личный кабинет</div>
        </div>
      </nav>
    </header >
  )
}

export default AppHeader;
