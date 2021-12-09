import {
  OPEN_ITEM_FEED,
  CLOSE_ITEM_FEED,
} from '../actions/order-feed';

import { orderFeedReducer } from './order-feed';

const initStateItemFeed = {
  number: null,
  name: '',
  list: [],
  status: '',
  data: null
};

const itemFeedExample = {
  number: 1,
  name: 'Бургер кинг',
  ingredients: ['булка', 'котлета', 'соус'],
  status: 'done',
  createdAt: '10.11.2021',
};

describe('orderFeedReducer', () => {
  it('возвращет начальное состояние для элементы из ленты заказов', () => {
    expect(orderFeedReducer(undefined, {})).toEqual({
      number: null,
      name: '',
      list: [],
      status: '',
      data: null
    });
  });

  it('обрабатывает состояние открытия окна заказа из ленты', () => {
    expect(orderFeedReducer(initStateItemFeed, {
      type: OPEN_ITEM_FEED,
      item: itemFeedExample,
    })
    ).toEqual({
      number: 1,
      name: 'Бургер кинг',
      list: ['булка', 'котлета', 'соус'],
      status: 'done',
      data: '10.11.2021',
    });
  });

  it('обрабатывает состояние закрытия окна заказа из ленты', () => {
    expect(orderFeedReducer(initStateItemFeed, { type: CLOSE_ITEM_FEED })).toEqual({
      number: null,
      name: '',
      list: [],
      status: '',
      data: null
    })
  });

});
