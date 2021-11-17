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

import { TRegisterForm, TUserForm, TLoginForm } from '../types/types';
import { AppDispatch, AppThunk } from '../types/index';
//авторизация
export const ADD_USER_INFO: 'ADD_USER_INFO' = 'ADD_USER_INFO';
export const EDIT_USER: 'EDIT_USER' = 'EDIT_USER';
export const DEL_USER_INFO: 'DEL_USER_INFO' = 'DEL_USER_INFO';
export const GET_FORGOT_PASS: 'GET_FORGOT_PASS' = 'GET_FORGOT_PASS';
export const GET_FORGOT_PASS_SUCCESS: 'GET_FORGOT_PASS_SUCCESS' = 'GET_FORGOT_PASS_SUCCESS';
export const GET_FORGOT_PASS_FAIL: 'GET_FORGOT_PASS_FAIL' = 'GET_FORGOT_PASS_FAIL';
export const SEND_LOGOUT: 'SEND_LOGOUT' = 'SEND_LOGOUT';
export const SEND_LOGOUT_FAIL: 'SEND_LOGOUT_FAIL' = 'SEND_LOGOUT_FAIL';
export const GET_USER_INFO: 'GET_USER_INFO' = 'GET_USER_INFO';
export const NEED_REFRESH_TOKEN: 'NEED_REFRESH_TOKEN' = 'NEED_REFRESH_TOKEN';
export const GET_TOKEN: 'GET_TOKEN' = 'GET_TOKEN';
export const TOKEN_REFRESH_SUCCESS: 'TOKEN_REFRESH_SUCCESS' = 'TOKEN_REFRESH_SUCCESS';
export const PASS_UPDATE_SUCCESS: 'PASS_UPDATE_SUCCESS' = 'PASS_UPDATE_SUCCESS';

export interface IAddUserInfo {
  readonly type: typeof ADD_USER_INFO;
  readonly user: TUserForm;
}
export interface IEditUser {
  readonly type: typeof EDIT_USER;
}
export interface IDelUserInfo {
  readonly type: typeof DEL_USER_INFO;
}
export interface IGetForgotPass {
  readonly type: typeof GET_FORGOT_PASS;
}
export interface IGetForgotPassSuccess {
  readonly type: typeof GET_FORGOT_PASS_SUCCESS;
}
export interface IGetForgotPassFail {
  readonly type: typeof GET_FORGOT_PASS_FAIL;
  message: string;
}
export interface ISendLogout {
  readonly type: typeof SEND_LOGOUT;
}
export interface ISendLogoutFail {
  readonly type: typeof SEND_LOGOUT_FAIL;
  message: string;
}
export interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO;
}
export interface INeedRefreshToken {
  readonly type: typeof NEED_REFRESH_TOKEN;
}
export interface IGetToken {
  readonly type: typeof GET_TOKEN;
}
export interface ITokenRefreshSuccess {
  readonly type: typeof TOKEN_REFRESH_SUCCESS;
}
export interface IPassUpdateSuccess {
  readonly type: typeof PASS_UPDATE_SUCCESS;
}

// Генераторы экшенов
export const addUserInfo = (user: TUserForm): IAddUserInfo => ({
  type: ADD_USER_INFO,
  user
});

export const getUserInfo = (): IGetUserInfo => ({
  type: GET_USER_INFO
});

export const needRefreshToken = (): INeedRefreshToken => ({
  type: NEED_REFRESH_TOKEN
});

export const getForgotPass = (): IGetForgotPass => ({
  type: GET_FORGOT_PASS
});

export const getForgotPassSuccess = (): IGetForgotPassSuccess => ({
  type: GET_FORGOT_PASS_SUCCESS
});

export const getForgotPassFail = (message: string): IGetForgotPassFail => ({
  type: GET_FORGOT_PASS_FAIL,
  message
});

export const sendLogout = (): ISendLogout => ({
  type: SEND_LOGOUT
});

export const delUserInfo = (): IDelUserInfo => ({
  type: DEL_USER_INFO
});

export const sendLogoutFail = (message: string): ISendLogoutFail => ({
  type: SEND_LOGOUT_FAIL,
  message
});

export const getToken = (): IGetToken => ({
  type: GET_TOKEN
});

export const tokenRefreshSuccess = (): ITokenRefreshSuccess => ({
  type: TOKEN_REFRESH_SUCCESS
});

export const passUpdateSuccess = (): IPassUpdateSuccess => ({
  type: PASS_UPDATE_SUCCESS
});

export type TUserActions =
  | IAddUserInfo
  | IEditUser
  | IDelUserInfo
  | IGetForgotPass
  | IGetForgotPassSuccess
  | IGetForgotPassFail
  | ISendLogout
  | ISendLogoutFail
  | IGetUserInfo
  | INeedRefreshToken
  | IGetToken
  | ITokenRefreshSuccess
  | IPassUpdateSuccess;

export const registerUser: AppThunk = (form: TRegisterForm) => (dispatch: AppDispatch) => {
  let authToken: string | undefined;
  signUpRequest(form)
    .then(res => {
      if (res.success) {
        authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);
        dispatch(addUserInfo(res.user));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


export const loginUser: AppThunk = (form: TLoginForm) => (dispatch: AppDispatch) => {
  let authToken;
  signInRequest(form)
    .then(res => {
      if (res.success) {
        authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);
        dispatch(addUserInfo(res.user));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserInfo());
  getUserInfoRequest()
    .then((res) => {
      if (res.success) {
        dispatch(addUserInfo(res.user));
      }
      if (res.message === 'jwt expired') {
        console.log('просрочен');
        dispatch(needRefreshToken());
      }
    })
    .catch((err) => {
      console.log(err, err.message);
    });
};


export const forgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch(getForgotPass());
  forgotPasswordRequest(email)
    .then((res) => {
      if (res.success) {
        dispatch(getForgotPassSuccess());
      }
    })
    .catch((err) => {
      dispatch(getForgotPassFail(err.message));
    });
};


export const logoutUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(sendLogout());
  logoutRequest('refreshToken')
    .then(res => {
      if (res.success) {
        deleteCookie('refreshToken');
        deleteCookie('token');
        dispatch(delUserInfo());
      }
    })
    .catch((err) => {
      dispatch(sendLogoutFail(err.message));
    });
};

export const refreshToken: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getToken());
  tokenRequest('refreshToken')
    .then((res) => {
      if (res.success) {
        let authToken;
        authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        setCookie('refreshToken', res.refreshToken);
        dispatch(tokenRefreshSuccess());
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveUserEdit: AppThunk = (userInfo: TUserForm) => (dispatch: AppDispatch) => {
  userInfoUpdateRequest(userInfo)
    .then(res => {
      if (res.success) {
        dispatch(addUserInfo(res.user));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updatePassword: AppThunk = (form: TUserForm) => (dispatch: AppDispatch) => {
  updatePasswordtRequest(form)
    .then((res) => {
      if (res.success) {
        dispatch(passUpdateSuccess());
      }
    })
    .catch((err) => {
      console.log(err);
    });;
};
