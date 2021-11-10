import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSE,
  WS_SEND_MESSAGE
} from '../actions/ws-action-type';

export const socketMiddleware = () => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          if (success) {
            dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
          }
        };

        if (type === WS_CONNECTION_CLOSE) {
          socket.close();
        }

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
