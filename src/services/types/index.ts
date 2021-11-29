import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TUserActions } from '../actions/auth';
import { TBurgerConstructor } from '../actions/burger-constructor';
import { TBurgerIngridients } from '../actions/burger-ingredients';
import { TIngridientDetail } from '../actions/ingredient-details';
import { TOrderActions } from '../actions/order-details';
import { TOrderFeed } from '../actions/order-feed';
import { TWSActions } from '../actions/ws-action-type';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions =
  | TUserActions
  | TBurgerConstructor
  | TBurgerIngridients
  | TIngridientDetail
  | TOrderActions
  | TOrderFeed
  | TWSActions;

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
