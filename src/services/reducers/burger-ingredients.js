import { GET_ITEMS_SUCCESS, ADD_COUNT_INGRIDIENT, DELETE_COUNT_BUN } from '../actions/burger-ingredients';

const initialState = {
  items: []
};

export const burgerIngredientsReducer = (store = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_SUCCESS: {
      return {
        ...store,
        items: [...action.items].map((item) => {
          return { ...item, count: 0 }
        })
      };
    }
    case ADD_COUNT_INGRIDIENT: {
      return {
        ...store,
        items: [...store.items].map(item => item._id === action.id ? { ...item, count: action.count } : item)
      };
    }
    case DELETE_COUNT_BUN: {
      return {
        ...store,
        items: [...store.items].map(item => item._id !== action.id && item.type === 'bun' ? { ...item, count: 0 } : item)
      };
    }
    default: {
      return store;
    }
  }

};
