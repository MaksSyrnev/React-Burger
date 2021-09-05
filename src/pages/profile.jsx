import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';

export function ProfilePage() {
  const [form, setValue] = useState({ email: '', password: '', name: '' })
  const dispatch = useDispatch();

  const onIconClick = () => {
    alert('Icon Click Callback');
  }

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = useCallback(
    e => {
      e.preventDefault();
      dispatch();
    },
    [dispatch, form]
  );

  return (
    <div className={styles.wrapper_profile}>
      <div className={styles.container_profile}>
        <div className={`${styles.nav_box} mr-15`}>

          <ul className={`${styles.navigation} mb-20`}>
            <li className={`${styles.menu_link} text text_type_main-medium`}>
              Профиль
            </li>
            <li className={`${styles.menu_link} text text_type_main-medium text_color_inactive`}>
              История заказов
            </li>
            <li className={`${styles.menu_link} text text_type_main-medium text_color_inactive`}>
              Выход
            </li>
          </ul>

          <p className={`${styles.text_profile} text text_type_main-default`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>

        </div>

        <div>
          <form className={styles.form}>
            <div className={`${styles.box} mt-6 mb-6`}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                name={'name'}
                errorText={'Ошибка'}
                icon={'EditIcon'}
              />
            </div>

            <div className={`${styles.box} mb-6`}>
              <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={onChange}
                name={'email'}
                errorText={'Ошибка'}
                icon={'EditIcon'}
              />
            </div>

            <div className={`${styles.box} mb-6`}>
              <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onChange}
                icon={'EditIcon'}
                name={'password'}
                error={false}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

