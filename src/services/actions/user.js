//POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.

import { url } from '../utils';


export function signUpRequest(form) {
  return function (dispatch) {
    fetch(`${url}auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

// export const loginRequest = async form => {
//   return await fetch('https://cosmic.nomoreparties.space/login', {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(form)
//   });
// };

// export function getBurgerIngredients() {
//   return function (dispatch) {
//     fetch(`${url}ingredients`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
//       })
//       .then((res) => {
//         dispatch({
//           type: GET_ITEMS_SUCCESS,
//           items: res.data
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   };
