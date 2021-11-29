import React from 'react';
import { useSelector } from '../../services/types/hooks';
//import { TBurgerItem } from '../../services/types/types';

export const TotalPrice: React.FC = () => {
  const stateBurger = useSelector(store => store.burger);

  let total: number = 0;
  if ((stateBurger.top !== undefined) && (stateBurger.top._id !== undefined)) {
    total = stateBurger.top.price * 2;
  }
  if ((stateBurger.main !== undefined) && (stateBurger.main.length !== 0)) {
    stateBurger.main.forEach((item) => {
      total = total + item.price;
    });
  }

  return (
    <p className="text text_type_digits-medium" >
      {total}
    </p>
  );

};
