import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export function ForgotPasswordPage() {

  const [value, setValue] = useState('value')
  const inputRef = useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback');
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
