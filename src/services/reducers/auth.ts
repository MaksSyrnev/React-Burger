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
  PASS_UPDATE_SUCCESS,
  TUserActions
} from '../actions/auth';

import { TUserInfo, TFeedRequestState, TTokenRefreshState, TGetUserState } from '../types/types';

type TUserState = {
  userInfo: TUserInfo;
  passwordReset: TFeedRequestState;
  logout: TFeedRequestState;
  getUser: TGetUserState;
  getToken: TTokenRefreshState;
};

const initialState: TUserState = {
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

export const authReducer = (store = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case ADD_USER_INFO: {
      return {
        ...store,
        userInfo: {
          ...store.userInfo,
          email: action.user.email,
          name: action.user.name
        },
        getUser: {
          ...store.getUser,
          feedRequest: false,
          needRefresh: false,
          feedFailed: false,
          errMessage: ''
        },
        logout: {
          ...store.logout,
          feedRequest: false,
          feedStatus: false,
        },
        getToken: {
          refreshSuccess: true,
          refreshFail: false
        }
      };
    }
    case EDIT_USER: {
      return {
        ...store,
        userInfo: {
          email: action.email ? action.email : store.userInfo.email,
          name: action.name ? action.name : store.userInfo.name,
          password: action.password ? action.password : store.userInfo.password
        }
      };
    }
    case DEL_USER_INFO: {
      return {
        ...store,
        userInfo: {
          email: '',
          name: '',
          password: '',
        },
        logout: {
          ...store.logout,
          feedRequest: false,
          feedStatus: true,
        },
        getToken: {
          refreshSuccess: false,
          refreshFail: false
        },
        getUser: {
          ...store.getUser,
          feedRequest: false,
          needRefresh: true,
          feedFailed: false,
          errMessage: ''
        }
      }
    }
    case GET_FORGOT_PASS: {
      return {
        ...store,
        passwordReset: {
          ...store.passwordReset,
          feedRequest: true
        }
      }
    }
    case GET_FORGOT_PASS_SUCCESS: {
      return {
        ...store,
        passwordReset: {
          ...store.passwordReset,
          feedRequest: false,
          feedStatus: true,
        }
      }
    }
    case GET_FORGOT_PASS_FAIL: {
      return {
        ...store,
        passwordReset: {
          ...store.passwordReset,
          feedRequest: false,
          feedStatus: false,
          errMessage: action.message
        }
      }
    }
    case SEND_LOGOUT: {
      return {
        ...store,
        logout: {
          ...store.logout,
          feedRequest: true,
          feedStatus: false,
          errMessage: ''
        }
      }
    }
    case SEND_LOGOUT_FAIL: {
      return {
        ...store,
        logout: {
          ...store.logout,
          feedRequest: false,
          feedStatus: false,
          errMessage: action.message
        }
      }
    }
    case GET_USER_INFO: {
      return {
        ...store,
        getUser: {
          ...store.getUser,
          feedRequest: true,
          needRefresh: false,
          errMessage: ''
        }
      }
    }
    case NEED_REFRESH_TOKEN: {
      return {
        ...store,
        getUser: {
          ...store.getUser,
          feedRequest: false,
          needRefresh: true,
          errMessage: ''
        },
        getToken: {
          refreshSuccess: false,
          refreshFail: false
        }
      }
    }
    case GET_TOKEN: {
      return {
        ...store,
        getUser: {
          ...store.getUser,
          needRefresh: true,
        },
        getToken: {
          refreshSuccess: false,
          refreshFail: false
        }
      }
    }
    case TOKEN_REFRESH_SUCCESS: {
      return {
        ...store,
        getUser: {
          ...store.getUser,
          needRefresh: false,
        },
        getToken: {
          refreshSuccess: true,
          refreshFail: false
        }
      }
    }
    case PASS_UPDATE_SUCCESS: {
      return {
        ...store,
        passwordReset: {
          ...store.passwordReset,
          passwordUpdate: true
        }
      }
    }
    default: {
      return store;
    }
  }

};
