import { ADD_LIST_ORDER, ADD_NUMBER_ORDER } from '../actions/order-details';

const initialState = { list: [], number: null };

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST_ORDER: {
      return {
        ...state,
        list: action.list
      };
    }
    case ADD_NUMBER_ORDER: {
      return {
        ...state,
        number: action.number
      };
    }
    default: {
      return state;
    }
  }
};
