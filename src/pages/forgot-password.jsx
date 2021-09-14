import { useState, useCallback } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { forgotPasswordtRequest } from '../services/api';
import { getCookie } from '../services/utils';

export function ForgotPasswordPage() {
  const isToken = getCookie('refreshToken');
  const [value, setValue] = useState('value')
  const history = useHistory();



  const handForgotPassword = useCallback(
    e => {
      e.preventDefault();
      if (value !== 'value') {
        forgotPasswordtRequest(value)
          .then((res) => {
            if (res.success) {
              const firstCrumb = [{ path: '/forgot-password', url: '/forgot-password', title: 'ForgotPassword' }];
              history.replace({ pathname: '/reset-password', state: firstCrumb });
            }
          });
      }
    });

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
              placeholder={'Укажите e-mail'}
              onChange={e => setValue(e.target.value)}
              name={'email'}
              errorText={'Ошибка'}
            />
          </div>

          <div className={`${styles.box} mb-20`}>
            <Button type="primary" size="medium" onClick={handForgotPassword}>
              Восстановить
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
