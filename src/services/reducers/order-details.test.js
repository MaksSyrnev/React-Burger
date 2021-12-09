import { orderReducer } from './order-details';
import {
  ADD_LIST_ORDER,
  ADD_NUMBER_ORDER,
  ADD_LIST_ORDER_FAIL
} from '../actions/order-details';

const initState = {
  list: [],
  number: 0,
  post: false,
  fail: false
};

describe('orderReducer', () => {
  it('обработчик возвращает начальное состояние', () => {
    expect(orderReducer(undefined, {})).toEqual({
      list: [],
      number: 0,
      post: false,
      fail: false
    });

  });

  it('обработчик состояния заказ отправлен', () => {
    expect(orderReducer(initState, {
      type: ADD_LIST_ORDER,
    })
    ).toEqual({
      number: 0,
      post: true,
      fail: false,
      list: []
    });
  });

  it('обработчик состояния номер заказа получен', () => {
    expect(orderReducer(initState, {
      type: ADD_NUMBER_ORDER,
      number: 1,
    })
    ).toEqual({
      list: [],
      number: 1,
      post: false,
      fail: false
    });
  });

  it('обработчик состояния ошибка отправки заказа', () => {
    expect(orderReducer(initState, {
      type: ADD_LIST_ORDER_FAIL,
    })
    ).toEqual({
      list: [],
      number: 0,
      post: true,
      fail: true
    });
  });

});
