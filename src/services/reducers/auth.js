import { ADD_USER_INFO } from '../actions/auth';
import { EDIT_USER } from '../actions/auth';
import { DEL_USER_INFO } from '../actions/auth';

const initialState = {
  email: '',
  name: '',
  password: ''
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
        name: action.name ? action.name : store.name,
        password: action.password ? action.password : store.password
      };
    }
    case DEL_USER_INFO: {
      return {
        ...store,
        email: '',
        name: '',
        password: ''
      };
    }
    default: {
      return store;
    }
  }

};
