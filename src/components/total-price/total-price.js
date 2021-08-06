import React, { useContext } from 'react';
import { StateBurgerContext } from '../../utils/state-burger-context';

export const TotalPrice = () => {
  const stateBurger = useContext(StateBurgerContext);
  let total = 0;
  if ((stateBurger.top !== undefined) && (stateBurger.top._id !== undefined)) {
    total = stateBurger.top.price * 2;
  }
  if ((stateBurger.main !== undefined) && (stateBurger.main.length !== 0)) {
    stateBurger.main.forEach(function (item) {
      total = total + item.price;
    });
  }

  return (
    <p className="text text_type_digits-medium">
      {total}
    </p>
  );

};
