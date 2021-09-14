import { useState, useCallback, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../services/actions/auth';
import { getCookie } from '../services/utils';


export function LoginPage() {
  const isToken = getCookie('refreshToken');
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const onIconClick = () => {
    alert('Icon Click Callback');
  };

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginUser(form));
    },
    [dispatch, form]
  );

  if (user.name || isToken) {
    return (
      <Redirect to={'/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <form className={styles.form}>

          <h1 className={`${styles.title} text text_type_main-medium`}>
            Вход
          </h1>

          <div className={`${styles.box} mt-6 mb-6`}>
            <Input
              type={'text'}
              placeholder={'E-mail'}
              onChange={onChange}
              name={'email'}
              errorText={'Ошибка'}

            />
          </div>

          <div className={`${styles.box} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Пароль'}
              onChange={onChange}
              icon={'ShowIcon'}
              name={'password'}
              error={false}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
            />
          </div>

          <div className={`${styles.box} mb-20`}>
            <Button type="primary" size="medium" onClick={handleLogin}>
              Войти
            </Button>
          </div>

          <p className={`${styles.text} text text_type_main-default`}>
            Вы — новый пользователь?
            <Link to="/register">
              <span className={styles.link}>Зарегистрироваться</span>
            </Link>
          </p>

          <p className={`${styles.text} text text_type_main-default`}>
            Забыли пароль?
            <Link to="/forgot-password">
              <span className={styles.link}> Восстановить пароль</span>
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
}
