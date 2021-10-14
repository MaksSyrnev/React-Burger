import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../actions/ws-action-type';

const initialState = {
  wsConnected: false,
  orders: [],
  error: ''
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: null,
        orders: action.payload
      };
    default:
      return state;
  }
};
