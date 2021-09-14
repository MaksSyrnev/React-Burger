import { useRef, useState, useCallback, useEffect } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updatePasswordtRequest } from '../services/api';
import { getCookie } from '../services/utils';

export function ResetPasswordPage() {
  const isToken = getCookie('refreshToken');
  const [form, setValue] = useState({ password: '', token: '' });
  const history = useHistory();
  const { state } = useLocation();


  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSavePassword = useCallback(
    e => {
      e.preventDefault();
      updatePasswordtRequest(form)
        .then((res) => {
          if (res.success) {
            history.replace({ pathname: '/login' });
          }
        });
    }
  );

  useEffect(
    () => {
      if (!state) {
        history.replace({ pathname: '/forgot-password' })
      }
    },
    /* eslint-disable-next-line */
    []
  );


  if (isToken) {
    return (
      <Redirect to={'/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <form className={styles.form}>

          <h1 className={`${styles.title} text text_type_main-medium`}>
            Восстановление пароля
          </h1>

          <div className={`${styles.box} mt-6 mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите новый пароль'}
              onChange={onChange}
              icon={'ShowIcon'}
              name={'password'}
              error={false}
              errorText={'Ошибка'}
            />
          </div>

          <div className={`${styles.box} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChange}
              name={'token'}
              errorText={'Ошибка'}
            />
          </div>

          <div className={`${styles.box} mb-20`}>
            <Button type="primary" size="medium" onClick={handleSavePassword}>
              Сохранить
            </Button>
          </div>

          <p className={`${styles.text} text text_type_main-default`}>
            Вспомнили пароль?
            <Link to="/login">
              <span className={styles.link}>
                Войти
              </span>
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}
