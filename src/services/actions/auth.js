import { setCookie } from '../utils';
import { signUpRequest, signInRequest } from '../api';

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const EDIT_USER = 'EDIT_USER';

export function registerUser(form) {
  return function (dispatch) {
    let authToken;
    signUpRequest(form)
      .then(res => {
        if (res.success) {
          authToken = res.accessToken.split('Bearer ')[1];
          setCookie('token', authToken);
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: ADD_USER_INFO,
            user: res.user
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export function loginUser(form) {
  return function (dispatch) {
    let authToken;
    signInRequest(form)
      .then(res => {
        if (res.success) {
          authToken = res.accessToken.split('Bearer ')[1];
          setCookie('token', authToken);
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: ADD_USER_INFO,
            user: res.user
          });
        }
      })
      .catch((err) => {
        console.log(err);

      });
  };
};
