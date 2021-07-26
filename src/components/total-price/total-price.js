import React, { useContext, useState } from 'react';
import { IngredientsContext } from '../../utils/ingredients-context';
import Ingredient from '../ingredient/ingredient';

export const TotalPrice = (props) => {
  const ingredientsData = useContext(IngredientsContext);
  const stateBurger = props.stateBurger;
  let total = 0;
  if (stateBurger.length > 0) {
    stateBurger.forEach(function (item) {
      total = total + ingredientsData.filter(itemData => itemData._id === item).price;
    });
  }

  return (
    <p className="text text_type_digits-medium">
      {total}
    </p>
  );

};
