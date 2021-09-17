import {
  ADD_LIST_ORDER,
  ADD_NUMBER_ORDER,
  ADD_LIST_ORDER_FAIL
} from '../actions/order-details';

const initialState = {
  list: [],
  number: null,
  post: false,
  fail: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_ORDER: {
      return {
        number: null,
        post: true,
        fail: false
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
