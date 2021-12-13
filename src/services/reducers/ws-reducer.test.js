import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/ws-action-type';

import { wsReducer } from './ws-reducer';

const initWSState = {
  wsConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false
  },
};
const ordersExample = {
  orders: [],
  total: 1,
  totalToday: 1,
  success: false,
};
const exampleWSMessage = JSON.stringify(ordersExample);

describe('wsReducer', () => {
  it('возвращает начальное состояние', () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
      },
    });
  });

  it('обрабатывает состояние соединение установлено', () => {
    expect(wsReducer(initWSState, { type: WS_CONNECTION_SUCCESS, payload: '' })
    ).toEqual({
      wsConnected: true,
      error: undefined,
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
      },
    });
  });

  it('обрабатывает состояние соединение закрыто', () => {
    expect(wsReducer(initWSState, { type: WS_CONNECTION_CLOSED, payload: 'reason' })).toEqual({
      wsConnected: false,
      error: 'reason',
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
      },
    });
  });

  it('обрабатывает состояние ошибка соединения', () => {
    expect(wsReducer(initWSState, { type: WS_CONNECTION_ERROR, payload: 'error' })).toEqual({
      wsConnected: false,
      error: 'error',
      orders: {
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
      }
    });
  });

  it('обрабатывает состояние получено сообщение', () => {
    expect(wsReducer(initWSState, { type: WS_GET_MESSAGE, payload: exampleWSMessage })).toEqual({
      wsConnected: false,
      error: undefined,
      orders: {
        orders: [],
        total: 1,
        totalToday: 1,
        success: false,
      }
    });
  });

});
