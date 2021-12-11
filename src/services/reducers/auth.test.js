import {
  ADD_USER_INFO,
  EDIT_USER,
  DEL_USER_INFO,
  GET_FORGOT_PASS,
  GET_FORGOT_PASS_SUCCESS,
  GET_FORGOT_PASS_FAIL,
  SEND_LOGOUT,
  SEND_LOGOUT_FAIL,
  GET_USER_INFO,
  NEED_REFRESH_TOKEN,
  GET_TOKEN,
  TOKEN_REFRESH_SUCCESS,
  PASS_UPDATE_SUCCESS
} from '../actions/auth';

import { authReducer } from './auth';

const initialStateUser = {
  userInfo: {
    email: '',
    name: '',
    password: '',
  },
  passwordReset: {
    feedRequest: false,
    feedFailed: false,
    feedStatus: false,
    errMessage: '',
    passwordUpdate: false
  },
  logout: {
    feedRequest: false,
    feedFailed: false,
    feedStatus: false,
    errMessage: '',
  },
  getUser: {
    feedRequest: false,
    feedFailed: false,
    needRefresh: true,
    errMessage: '',
  },
  getToken: {
    refreshSuccess: false,
    refreshFail: false
  }
};

const testUser = {
  email: 'e123@mail.ru',
  name: 'Ex'
};

const stateUserLogin = {
  userInfo: {
    password: '',
    email: 'e123@mail.ru',
    name: 'Ex'
  },
  getUser: {
    feedRequest: false,
    needRefresh: false,
    feedFailed: false,
    errMessage: ''
  },
  logout: {
    feedFailed: false,
    feedRequest: false,
    feedStatus: false,
    errMessage: '',
  },
  getToken: {
    refreshSuccess: true,
    refreshFail: false
  },
  passwordReset: {
    feedRequest: false,
    feedFailed: false,
    feedStatus: false,
    errMessage: '',
    passwordUpdate: false
  }
};

describe('authReducer', () => {
  it('возвращет начальное состояние ветки пользователя', () => {
    expect(authReducer(undefined, {})).toEqual(initialStateUser);
  });

  it('обработчик успешного логина', () => {
    expect(authReducer(initialStateUser, { type: ADD_USER_INFO, user: testUser })).toEqual({
      userInfo: {
        password: '',
        email: 'e123@mail.ru',
        name: 'Ex'
      },
      getUser: {
        feedRequest: false,
        needRefresh: false,
        feedFailed: false,
        errMessage: ''
      },
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: true,
        refreshFail: false
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      },
    });
  });

  it('обработчик изменения данных пользователя', () => {
    expect(authReducer(stateUserLogin, {
      type: EDIT_USER,
      email: 'e@mail.ru',
      name: 'Mex'
    })).toEqual({
      userInfo: {
        password: '',
        email: 'e@mail.ru',
        name: 'Mex'
      },
      getUser: {
        feedRequest: false,
        needRefresh: false,
        feedFailed: false,
        errMessage: ''
      },
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: true,
        refreshFail: false
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      },
    });

  });

  it('обработчик удаления информации о пользователе', () => {
    expect(authReducer(stateUserLogin, { type: DEL_USER_INFO })).toEqual({
      userInfo: {
        email: '',
        name: '',
        password: '',
      },
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: true,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      },
      getUser: {
        feedRequest: false,
        needRefresh: true,
        feedFailed: false,
        errMessage: ''
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      }
    });
  });

  it('обработчик запроса на обновление пароля', () => {
    expect(authReducer(initialStateUser, { type: GET_FORGOT_PASS })).toEqual({
      passwordReset: {
        feedRequest: true,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      },
      userInfo: {
        email: '',
        name: '',
        password: '',
      },
      logout: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
      },
      getUser: {
        feedRequest: false,
        feedFailed: false,
        needRefresh: true,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      }

    });
  });

  it('обработчик ответа запрос на сброс пароля успешно отправлен', () => {
    expect(authReducer(initialStateUser, { type: GET_FORGOT_PASS_SUCCESS })).toEqual({
      passwordReset: {
        feedRequest: false,
        feedStatus: true,
        feedFailed: false,
        errMessage: '',
        passwordUpdate: false
      },
      userInfo: {
        email: '',
        name: '',
        password: '',
      },
      logout: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
      },
      getUser: {
        feedRequest: false,
        feedFailed: false,
        needRefresh: true,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      }
    });
  });

  it('обработчик ответа запрос на сброс пароля провалился', () => {
    expect(authReducer(initialStateUser, { type: GET_FORGOT_PASS_FAIL, message: 'ошибка' })).toEqual({
      passwordReset: {
        passwordUpdate: false,
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: 'ошибка'
      },
      userInfo: {
        email: '',
        name: '',
        password: '',
      },
      logout: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
      },
      getUser: {
        feedRequest: false,
        feedFailed: false,
        needRefresh: true,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      }
    });
  });

  it('обработчик отправки запроса на выход пользователя', () => {
    expect(authReducer(stateUserLogin, { type: SEND_LOGOUT })).toEqual({
      logout: {
        feedFailed: false,
        feedRequest: true,
        feedStatus: false,
        errMessage: ''
      },
      userInfo: {
        password: '',
        email: 'e123@mail.ru',
        name: 'Ex'
      },
      getUser: {
        feedRequest: false,
        needRefresh: false,
        feedFailed: false,
        errMessage: ''
      },
      getToken: {
        refreshSuccess: true,
        refreshFail: false
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      }
    });
  });

  it('обработчик ответа запрос на выход провалился', () => {
    expect(authReducer(stateUserLogin, { type: SEND_LOGOUT_FAIL, message: 'ошибка' })).toEqual({
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: 'ошибка'
      },
      userInfo: {
        password: '',
        email: 'e123@mail.ru',
        name: 'Ex'
      },
      getUser: {
        feedRequest: false,
        needRefresh: false,
        feedFailed: false,
        errMessage: ''
      },
      getToken: {
        refreshSuccess: true,
        refreshFail: false
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      }
    });
  });

  it('обработчик состояния запрос на информацию о пользователе послан', () => {
    expect(authReducer(initialStateUser, { type: GET_USER_INFO })).toEqual({
      getUser: {
        feedFailed: false,
        feedRequest: true,
        needRefresh: false,
        errMessage: ''
      },
      userInfo: {
        email: '',
        name: '',
        password: '',
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      },
      logout: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      }
    });
  });

  it('обработчик состояния токен просрочен', () => {
    expect(authReducer(stateUserLogin, { type: NEED_REFRESH_TOKEN })).toEqual({
      getUser: {
        feedFailed: false,
        feedRequest: false,
        needRefresh: true,
        errMessage: ''
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      },
      userInfo: {
        password: '',
        email: 'e123@mail.ru',
        name: 'Ex'
      },
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: '',
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      }
    });
  });

  it('обработчик состояния запрашиваем токен', () => {
    expect(authReducer(stateUserLogin, { type: GET_TOKEN })).toEqual({
      getUser: {
        feedFailed: false,
        feedRequest: false,
        needRefresh: true,
        errMessage: ''
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      },
      userInfo: {
        password: '',
        email: 'e123@mail.ru',
        name: 'Ex'
      },
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: '',
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      }
    });
  });

  it('обработчик состояния токен обновлен успешно', () => {
    expect(authReducer(stateUserLogin, { type: TOKEN_REFRESH_SUCCESS })).toEqual({
      getUser: {
        feedFailed: false,
        feedRequest: false,
        needRefresh: false,
        errMessage: ''
      },
      getToken: {
        refreshSuccess: true,
        refreshFail: false
      },
      userInfo: {
        password: '',
        email: 'e123@mail.ru',
        name: 'Ex'
      },
      logout: {
        feedFailed: false,
        feedRequest: false,
        feedStatus: false,
        errMessage: '',
      },
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: false
      }
    });
  });

  it('обработчик состояния пароль обновлен успешно', () => {
    expect(authReducer(initialStateUser, { type: PASS_UPDATE_SUCCESS })).toEqual({
      passwordReset: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
        passwordUpdate: true
      },
      userInfo: {
        email: '',
        name: '',
        password: '',
      },
      logout: {
        feedRequest: false,
        feedFailed: false,
        feedStatus: false,
        errMessage: '',
      },
      getUser: {
        feedRequest: false,
        feedFailed: false,
        needRefresh: true,
        errMessage: '',
      },
      getToken: {
        refreshSuccess: false,
        refreshFail: false
      }
    });
  });

});
