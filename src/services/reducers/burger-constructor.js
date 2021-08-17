import { ADD_BUN, ADD_MAIN, DELETE_MAIN_ELEMENT, REORDER_MAIN_ELEMENTS } from '../actions/burger-constructor';

const initialState = {
  top: {},
  main: []
};

export const burgerConstructorReducer = (store = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...store,
        top: action.item
      };
    }
    case ADD_MAIN: {
      return {
        ...store,
        main: [...store.main, action.item]
      };
    }
    case DELETE_MAIN_ELEMENT: {
      return {
        ...store,
        main: action.payload
      }
    }
    case REORDER_MAIN_ELEMENTS: {
      return {
        ...store,
        main: action.payload
      }
    }
    default: {
      return store;
    }
  }

};
