import { ADD_USER_INFO } from '../actions/auth';

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
    default: {
      return store;
    }
  }

};
