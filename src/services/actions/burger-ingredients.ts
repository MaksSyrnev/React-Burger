import { url } from '../utils';
import { AppDispatch, AppThunk } from '../types/index';
import { TItemIngridient } from '../types/types';

export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const ADD_COUNT_INGRIDIENT: 'ADD_COUNT_INGRIDIENT' = 'ADD_COUNT_INGRIDIENT';
export const DELETE_COUNT_BUN: 'DELETE_COUNT_BUN' = 'DELETE_COUNT_BUN';

export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: TItemIngridient[];
}
export interface IAddCountIngridient {
  readonly type: typeof ADD_COUNT_INGRIDIENT;
  readonly id: string;
  readonly count: number;
}
export interface IDeleteCountBun {
  readonly type: typeof DELETE_COUNT_BUN;
  readonly id: string;
  readonly count: 0;
}

//генератор экшена
export const getItemsSuccess = (items: TItemIngridient[]): IGetItemsSuccess => ({
  type: GET_ITEMS_SUCCESS,
  items,
})

export type TBurgerIngridients =
  | IGetItemsSuccess
  | IAddCountIngridient
  | IDeleteCountBun;

export const getBurgerIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  fetch(`${url}ingredients`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      dispatch(getItemsSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
    })
};

