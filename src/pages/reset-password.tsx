import { useState, useCallback, useEffect } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { updatePassword } from '../services/actions/auth';
import { getCookie } from '../services/utils';
import { useDispatch, useSelector } from '../services/types/hooks';
//import { TUserForm } from '../services/types/types';

export function ResetPasswordPage() {
  const isToken = getCookie('refreshToken');
  const [form, setValue] = useState({ password: '', token: '' });
  const history = useHistory();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const updateStatus = user.passwordReset.passwordUpdate;

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSavePassword = useCallback(
    e => {
      e.preventDefault();
      dispatch(updatePassword(form));
    }, [dispatch, form]
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

  useEffect(() => {
    if (updateStatus) {
      history.replace({ pathname: '/login' });
    }
  }, [history, updateStatus]);

  if (isToken) {
    return (
      <Redirect to={'/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <form className={styles.form} onSubmit={handleSavePassword}>

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
              value={form.password}
            />
          </div>

          <div className={`${styles.box} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChange}
              name={'token'}
              errorText={'Ошибка'}
              value={form.token}
            />
          </div>

          <div className={`${styles.box} mb-20`}>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>

          <p className={`${styles.text} text text_type_main-default`}>
            Вспомнили пароль?
            <Link to="/login" className={styles.link}>
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
