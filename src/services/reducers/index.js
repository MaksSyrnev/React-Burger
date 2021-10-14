import { combineReducers } from 'redux';
import { ingredientDetailsReducer } from './ingredient-details';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';
import { authReducer } from './auth';
import { wsReducer } from './ws-reducer';

export const rootReducer = combineReducers({
  current: ingredientDetailsReducer,
  ingredients: burgerIngredientsReducer,
  burger: burgerConstructorReducer,
  order: orderReducer,
  user: authReducer,
  ws: wsReducer
});
