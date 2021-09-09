import { ADD_USER_INFO } from '../actions/auth';
import { EDIT_USER } from '../actions/auth';

const initialState = {
  email: '',
  name: ''
};

export const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO: {
      return {
        ...store,
        email: action.user.email,
        name: action.user.name
      };
    }
    case EDIT_USER: {
      return {
        ...store,
        email: action.email ? action.email : store.email,
        name: action.name ? action.name : store.name
      };
    }
    default: {
      return store;
    }
  }

};
