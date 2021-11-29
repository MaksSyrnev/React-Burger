import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSActions,
  TWSOrdersFeed
} from '../actions/ws-action-type';

export type TWSState = {
  wsConnected: boolean;
  orders: TWSOrdersFeed;
  error?: string;
};

const initialState: TWSState = {
  wsConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false
  },
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
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
        error: undefined,
        orders: JSON.parse(action.payload)
      };
    default:
      return state;
  }
};
