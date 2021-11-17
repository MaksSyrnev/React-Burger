import { store } from '../store';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TUserActions } from '../actions/auth';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TUserActions;

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
