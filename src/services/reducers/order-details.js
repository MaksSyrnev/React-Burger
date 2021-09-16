import {
  ADD_LIST_ORDER,
  ADD_NUMBER_ORDER,
  HANDLE_ORDER_FAIL
} from '../actions/order-details';

const initialState = {
  list: [],
  number: null,
  orderPush: false,
  orderHandleFail: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_ORDER: {
      return {
        ...state,
        list: action.list,
        number: null,
        orderPush: true
      };
    }
    case ADD_NUMBER_ORDER: {
      return {
        ...state,
        number: action.number,
        orderPush: false,
      };
    }
    case HANDLE_ORDER_FAIL: {
      return {
        ...state,
        orderPush: true,
        orderHandleFail: true,
      };
    }
    default: {
      return state;
    }
  }
};
