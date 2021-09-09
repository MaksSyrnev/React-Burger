import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user.module.css';
import { useState, useCallback, useEffect } from 'react';
import { EDIT_USER, ADD_USER_INFO } from '../../services/actions/auth';
import { getUserInfoRequest, tokenRequest } from '../../services/api';
import { setCookie } from '../../services/utils';

import { useSelector, useDispatch } from 'react-redux';

export function UserInfo() {
  const [auth, setAuth] = useState(null);
  const dataUser = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserInfoRequest()
      .then(data => {
        console.log('дождался?');
        console.log(data);
        return data;
      })
      .then((data) => {

        if (data.success) {

          console.log('здесь диспатчим данные пользователя');
          dispatch({
            type: ADD_USER_INFO,
            user: data.user
          });

        } else {
          console.log('не в этот раз');
          setAuth('false');
        }
      });

    /* getUserInfoRequest()
      .then(data => {

        return data;
      })
      .then((data) => {

        if (data.success) {

          console.log('здесь диспатчим данные пользователя');

        } else {

          console.log('не в этот раз');

          tokenRequest('refreshToken')
            .then((res) => {
              let authToken;
              if (res.success) {
                authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                setCookie('refreshToken', res.refreshToken);
                getUserInfoRequest();
              });
        }
      }); */

    /*  }
         }); */

  }, []);

  useEffect(() => {
    console.log(auth);
    if (auth === 'false') {
      console.log('запросим обновление токена и установен потом переменную в тру');
      tokenRequest('refreshToken')
        .then((res) => {
          let authToken;
          if (res.success) {
            authToken = res.accessToken.split('Bearer ')[1];
            setCookie('token', authToken);
            setCookie('refreshToken', res.refreshToken);
            setAuth('true');
          }
        });

    } else if (auth === 'true') {
      console.log('если ауф тру повторим запрос данных и будем диспатчить');

    }

  }, [auth]);


  const onChange = e => {
    dispatch({
      type: EDIT_USER,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className={styles.form}>
      <div className={`${styles.box} mt-6 mb-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          errorText={'Ошибка'}
          icon={'EditIcon'}
          value={dataUser.name}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.box} mb-6`}>
        <Input
          type={'text'}
          placeholder={'Логин'}
          name={'email'}
          errorText={'Ошибка'}
          icon={'EditIcon'}
          value={dataUser.email}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.box} mb-6`}>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
        />
      </div>
    </form>
  );
}
