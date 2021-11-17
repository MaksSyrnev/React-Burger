import { postOrderRequest, tokenRequest } from '../api';
import { setCookie } from '../utils';
import { AppDispatch, AppThunk } from '../types/index';

export const ADD_LIST_ORDER: 'ADD_LIST_ORDER' = 'ADD_LIST_ORDER';
export const ADD_NUMBER_ORDER: 'ADD_NUMBER_ORDER' = 'ADD_NUMBER_ORDER';
export const ADD_LIST_ORDER_FAIL: 'ADD_LIST_ORDER_FAIL' = 'ADD_LIST_ORDER_FAIL';

export interface IAddListOrderAction {
  readonly type: typeof ADD_LIST_ORDER;
}

export interface IAddNumberOrderAction {
  readonly type: typeof ADD_NUMBER_ORDER;
  readonly number: number | null;
}

export interface IAddListOrderFailAction {
  readonly type: typeof ADD_LIST_ORDER_FAIL;
}

export type TOrderActions =
  | IAddListOrderAction
  | IAddNumberOrderAction
  | IAddListOrderFailAction;

export const orderPost: AppThunk = (order: string[]) => (dispatch: AppDispatch) => {
  dispatch({
    type: ADD_LIST_ORDER,
  });
  postOrderRequest(order)
    .then((res) => {
      if (res.success) {
        const orderData = res.order;
        dispatch({
          type: ADD_NUMBER_ORDER,
          number: orderData.number
        });
      }
      if (res.message === 'jwt expired') {
        console.log('пока выбирали бургер токен просрочен');
        tokenRequest('refreshToken')
          .then((res) => {
            if (res.success) {
              let authToken;
              authToken = res.accessToken.split('Bearer ')[1];
              setCookie('token', authToken);
              setCookie('refreshToken', res.refreshToken);
              postOrderRequest(order)
                .then((res) => {
                  if (res.success) {
                    const orderData = res.order;
                    dispatch({
                      type: ADD_NUMBER_ORDER,
                      number: orderData.number
                    });
                  }
                  if (!res.success) {
                    console.log(`что то пошло не так: ${res.message}`);
                    dispatch({
                      type: ADD_LIST_ORDER_FAIL,
                    });
                  }
                });
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//запрос к апи перенесен в апи
//thunk action упростился и стал понятнее
