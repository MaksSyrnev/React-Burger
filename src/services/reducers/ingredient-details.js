import { OPEN_ITEM, CLOSE_ITEM } from '../actions/ingredient-details';

const initialState = { ingredientDetails: {} };

export const ingredientDetailsReducer = (store = initialState, action) => {
  switch (action.type) {
    case OPEN_ITEM: {
      return {
        ...store,
        ingredientDetails: action.item
      };
    }
    case CLOSE_ITEM: {
      return {
        ...store,
        ingredientDetails: {}
      };
    }
    default: {
      return store;
    }
  }

};
