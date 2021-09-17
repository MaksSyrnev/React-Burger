import { setCookie, deleteCookie } from '../utils';
import {
  signUpRequest,
  signInRequest,
  getUserInfoRequest,
  forgotPasswordRequest,
  logoutRequest,
  tokenRequest,
  userInfoUpdateRequest,
  updatePasswordtRequest
} from '../api';

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const EDIT_USER = 'EDIT_USER';
export const DEL_USER_INFO = 'DEL_USER_INFO';
export const GET_FORGOT_PASS = 'GET_FORGOT_PASS';
export const GET_FORGOT_PASS_SUCCESS = 'GET_FORGOT_PASS_SUCCESS';
export const GET_FORGOT_PASS_FAIL = 'GET_FORGOT_PASS_FAIL';
export const SEND_LOGOUT = 'SEND_LOGOUT';
export const SEND_LOGOUT_FAIL = 'SEND_LOGOUT_FAIL';
export const GET_USER_INFO = 'GET_USER_INFO';
export const NEED_REFRESH_TOKEN = 'NEED_REFRESH_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const PASS_UPDATE_SUCCESS = 'PASS_UPDATE_SUCCESS';

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

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_INFO
    });
    getUserInfoRequest()
      .then((res) => {
        if (res.success) {
          dispatch({
            type: ADD_USER_INFO,
            user: res.user
          });
        }
        if (res.message === 'jwt expired') {
          console.log('просрочен');
          dispatch({
            type: NEED_REFRESH_TOKEN,
          });
        }
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: GET_FORGOT_PASS
    });
    forgotPasswordRequest(email)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_FORGOT_PASS_SUCCESS
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_FORGOT_PASS_FAIL,
          message: err.message
        });
      });
  }
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({
      type: SEND_LOGOUT
    });
    logoutRequest('refreshToken')
      .then(res => {
        if (res.success) {
          deleteCookie('refreshToken');
          deleteCookie('token');
          dispatch({
            type: DEL_USER_INFO
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SEND_LOGOUT_FAIL,
          message: err.message
        });
      });
  }
}

export function refreshToken() {
  return function (dispatch) {
    dispatch({
      type: GET_TOKEN
    });
    tokenRequest('refreshToken')
      .then((res) => {
        if (res.success) {
          let authToken;
          authToken = res.accessToken.split('Bearer ')[1];
          setCookie('token', authToken);
          setCookie('refreshToken', res.refreshToken);
          dispatch({
            type: TOKEN_REFRESH_SUCCESS
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function saveUserEdit(userInfo) {
  return function (dispatch) {
    userInfoUpdateRequest(userInfo)
      .then(res => {
        if (res.success) {
          dispatch({
            type: ADD_USER_INFO,
            user: res.user
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function updatePassword(form) {
  return function (dispatch) {
    updatePasswordtRequest(form)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: PASS_UPDATE_SUCCESS,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });;
  }
}
