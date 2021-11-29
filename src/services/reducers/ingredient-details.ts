import { OPEN_ITEM, CLOSE_ITEM, TIngridientDetail } from '../actions/ingredient-details';
import { TIngridientModal } from '../types/types';

export type TIngridientState = {
  ingredientDetails: TIngridientModal;
};

const initialState: TIngridientState = {
  ingredientDetails: {
    "_id": '',
    "name": '',
    "type": '',
    "proteins": 0,
    "fat": 0,
    "carbohydrates": 0,
    "calories": 0,
    "price": 0,
    "image": '',
    "image_mobile": '',
    "image_large": ''
  }
};

export const ingredientDetailsReducer = (store = initialState, action: TIngridientDetail): TIngridientState => {
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
        ingredientDetails: initialState.ingredientDetails
      };
    }
    default: {
      return store;
    }
  }

};
