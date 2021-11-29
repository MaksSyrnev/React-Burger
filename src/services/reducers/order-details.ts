import {
  ADD_LIST_ORDER,
  ADD_NUMBER_ORDER,
  ADD_LIST_ORDER_FAIL,
  TOrderActions
} from '../actions/order-details';

export type TOrderState = {
  list: ReadonlyArray<string>;
  number: number;
  post: boolean;
  fail: boolean;
};

const initialState: TOrderState = {
  list: [],
  number: 0,
  post: false,
  fail: false
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case ADD_LIST_ORDER: {
      return {
        number: 0,
        post: true,
        fail: false,
        list: []
      };
    }
    case ADD_NUMBER_ORDER: {
      return {
        ...state,
        number: action.number,
        post: false,
        fail: false
      };
    }
    case ADD_LIST_ORDER_FAIL: {
      return {
        ...state,
        post: true,
        fail: true
      };
    }
    default: {
      return state;
    }
  }
};
