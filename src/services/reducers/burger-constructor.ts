import { ADD_BUN, ADD_MAIN, DELETE_MAIN_ELEMENT, REORDER_MAIN_ELEMENTS, TBurgerConstructor } from '../actions/burger-constructor';
import { TItemIngridient } from '../types/types';

export type TBurgerState = {
  top: TItemIngridient;
  main: TItemIngridient[];
};

const initialState: TBurgerState = {
  top: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    count: 0
  },
  main: []
};

export const burgerConstructorReducer = (store = initialState, action: TBurgerConstructor): TBurgerState => {
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
