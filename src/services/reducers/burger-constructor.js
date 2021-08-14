import { ADD_BUN, ADD_MAIN, DELETE_MAIN_ELEMENT } from '../actions/burger-constructor';

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
        main: [...store.main.filter(element => element.id !== action.itemId)]
      };
    }
    default: {
      return store;
    }
  }

};
