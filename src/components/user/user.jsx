import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user.module.css';
import { useState, useCallback, useEffect } from 'react';
import { EDIT_USER, ADD_USER_INFO } from '../../services/actions/auth';
import { getUserInfoRequest, tokenRequest, userInfoUpdateRequest } from '../../services/api';
import { setCookie, deleteCookie } from '../../services/utils';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function UserInfo() {
  const [auth, setAuth] = useState(null);
  const dataUser = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    getUserInfoRequest()
      .then(data => {
        return data;
      })
      .then((data) => {
        if (data.success) {
          dispatch({
            type: ADD_USER_INFO,
            user: data.user
          });
        } else {
          setAuth('false');
        }
      });
  }, []);

  useEffect(() => {
    let authToken;
    if (auth === 'false') {
      tokenRequest('refreshToken')
        .then((res) => {
          if (res.success) {
            authToken = res.accessToken.split('Bearer ')[1];
            setCookie('token', authToken);
            setCookie('refreshToken', res.refreshToken);
            setAuth('true');
          }
          if (!res.success) {
            deleteCookie('token');
            deleteCookie('refreshToken');
            history.replace({ pathname: '/login' });
          }
        });
    }
  }, [auth]);

  const onChange = e => {
    dispatch({
      type: EDIT_USER,
      [e.target.name]: e.target.value
    });
  };

  const saveUserInfo = useCallback(
    e => {
      e.preventDefault();
      userInfoUpdateRequest(dataUser)
        .then(res => {
          if (res.success) {
            console.log('все получилось');
            dispatch({
              type: ADD_USER_INFO,
              user: res.user
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );

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
          value={dataUser.password}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.box} mb-20`}>
        <Button type="primary" size="medium" onClick={saveUserInfo}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}
