import React from 'react';
import appStyle from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data, stateBurger } from '../../utils/data';

function App() {
  return (
    <div className={appStyle.page}>
      <AppHeader />
      <main className={appStyle.content}>
        <BurgerIngredients data={data} />
        <BurgerConstructor stateBurger={stateBurger} />
      </main>
    </div>
  );
}

export default App;
