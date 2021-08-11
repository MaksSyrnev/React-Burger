import { GET_ITEMS_SUCCESS } from '../actions/burger-ingredients';

const initialState = {
  items: []
};

export const burgerIngredientsReducer = (store = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS: {
      return {
        ...store,
        items: action.items
      };
    }
    default: {
      return store;
    }
  }

};
