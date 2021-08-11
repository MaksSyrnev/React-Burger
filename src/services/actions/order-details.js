import { url } from '../../utils/data';
export const ADD_LIST_ORDER = 'ADD_LIST_ORDER';
export const ADD_NUMBER_ORDER = 'ADD_NUMBER_ORDER';

export function orderPost(order) {
  return function (dispatch) {
    dispatch({
      type: ADD_LIST_ORDER,
      list: order
    });

    fetch(`${url}orders`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "ingredients": order
      })
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        const orderData = res.order;
        dispatch({
          type: ADD_NUMBER_ORDER,
          number: orderData.number
        });
        //setOrder(orderData.number);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
