import type { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSE,
  WS_SEND_MESSAGE,
  TWSOrdersFeed,
  TWSActions
} from '../actions/ws-action-type';

import { AppDispatch, RootState } from '../types/index';

export const socketMiddleware = (): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: '' });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: 'error' });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event.reason });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData }: TWSOrdersFeed = parsedData;
          if (success) {
            dispatch({ type: WS_GET_MESSAGE, payload: JSON.stringify(parsedData) });
          }
        };

        if (type === WS_CONNECTION_CLOSE) {
          socket.close();
        }

        if (type === WS_SEND_MESSAGE) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
