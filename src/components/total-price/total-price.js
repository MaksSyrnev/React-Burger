import React from 'react';
import { useSelector } from 'react-redux';

export const TotalPrice = () => {
  const stateBurger = useSelector(store => store.burger);

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
