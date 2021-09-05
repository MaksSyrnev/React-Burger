import { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { registerUser } from '../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export function RegisterPage() {
  const [form, setValue] = useState({ email: '', password: '', name: '' })
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const onIconClick = () => {
    alert('Icon Click Callback');
  }

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = useCallback(
    e => {
      e.preventDefault();
      dispatch(registerUser(form));
    },
    [dispatch, form]
  );

  if (user.name) {
    return (
      <Redirect to={'/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <form className={styles.form}>

          <h1 className={`${styles.title} text text_type_main-medium`}>
            Регистрация
          </h1>

          <div className={`${styles.box} mt-6 mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              name={'name'}
              errorText={'Ошибка'}
            />
          </div>

          <div className={`${styles.box} mb-6`}>
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
              type={'password'}
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
            <Button type="primary" size="medium" onClick={handleRegister}>
              Зарегистрироваться
            </Button>
          </div>

          <p className={`${styles.text} text text_type_main-default`}>
            Уже зарегистрированы?
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
