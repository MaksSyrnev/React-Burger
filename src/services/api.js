import { url } from './utils';
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.

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

export const tokenRequest = async refreshToken => {
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
      "token": refreshToken
    })
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const logoutRequest = async refreshToken => {
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
      "token": refreshToken
    })
  })
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
};
