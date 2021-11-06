import { useState, useCallback, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { getCookie } from '../services/utils';
import { forgotPassword } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export function ForgotPasswordPage() {
  const isToken = getCookie('refreshToken');
  const [value, setValue] = useState<string>('')
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.user);
  const status: boolean = user.passwordReset.feedStatus;

  const handleForgotPassword = useCallback(
    (e) => {
      e.preventDefault();
      if (value !== '') {
        dispatch(forgotPassword(value));
      }
    }, [dispatch, value]
  );

  useEffect(() => {
    if (status) {
      const firstCrumb = [{ path: '/forgot-password', url: '/forgot-password', title: 'ForgotPassword' }];
      history.replace({ pathname: '/reset-password', state: firstCrumb });
    }
  }, [history, status]);

  if (isToken) {
    return (
      <Redirect to={'/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <form className={styles.form} onSubmit={handleForgotPassword}>

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
              value={value}
            />
          </div>

          <div className={`${styles.box} mb-20`}>
            <Button type="primary" size="medium">
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
