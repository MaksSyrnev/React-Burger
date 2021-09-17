import { url, getCookie } from './utils';
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.
// GET  https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
// PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.
// POST https://norma.nomoreparties.space/api/password-reset - эндпоинт забыл пароль
// POST https://norma.nomoreparties.space/api/password-reset/reset -эндпоинт установить новый пароль

export const signUpRequest = async form => {
  return await fetch(`${url}auth/register`, {
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
};

export const signInRequest = async form => {
  return await fetch(`${url}auth/login`, {
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
};

export const logoutRequest = async nameToken => {
  return await fetch(`${url}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "token": getCookie(nameToken)
    })
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const tokenRequest = async nameToken => {
  return await fetch(`${url}auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "token": getCookie(nameToken)
    })
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getUserInfoRequest = async () => {
  return await fetch(`${url}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
    .then((res) => {
      return res.ok ? res.json() : ((res.status === 401) || (res.status === 403) ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    });
};

export const userInfoUpdateRequest = async form => {
  return await fetch(`${url}auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const forgotPasswordRequest = async value => {
  return await fetch(`${url}password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "email": value
    })
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const updatePasswordtRequest = async form => {
  return await fetch(`${url}password-reset/reset`, {
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
};

export const postOrderRequest = async (order) => {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      "ingredients": order
    })
  })
    .then((res) => {
      return res.ok ? res.json() : ((res.status === 403) ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
    })
}
