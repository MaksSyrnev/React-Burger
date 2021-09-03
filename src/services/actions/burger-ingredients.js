import { url } from '../utils';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const ADD_COUNT_INGRIDIENT = 'ADD_COUNT_INGRIDIENT';
export const DELETE_COUNT_BUN = 'DELETE_COUNT_BUN';

export function getBurgerIngredients() {
  return function (dispatch) {
    fetch(`${url}ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      })
  };
}
