import { ADD_BUN, ADD_MAIN } from '../actions/burger-constructor';

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
    default: {
      return store;
    }
  }

};
