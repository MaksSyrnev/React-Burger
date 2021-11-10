import React from 'react';
import { useSelector } from 'react-redux';
import { TBurgerItem } from '../../services/types';

export const TotalPrice: React.FC = () => {
  const stateBurger: any = useSelector<any>(store => store.burger);

  let total: number = 0;
  if ((stateBurger.top !== undefined) && (stateBurger.top._id !== undefined)) {
    total = stateBurger.top.price * 2;
  }
  if ((stateBurger.main !== undefined) && (stateBurger.main.length !== 0)) {
    stateBurger.main.forEach(function (item: TBurgerItem) {
      total = total + item.price;
    });
  }

  return (
    <p className="text text_type_digits-medium" >
      {total}
    </p>
  );

};
