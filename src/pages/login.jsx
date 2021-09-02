import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

export function LoginPage() {

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

          <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>

          <div className={`${styles.box} mt-6 mb-6`}>
            <Input
              type={'text'}
              placeholder={'E-mail'}
              onChange={e => setValue(e.target.value)}
              name={'email'}
              errorText={'Ошибка'}

            />
          </div>

          <div className={`${styles.box} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Пароль'}
              onChange={e => setValue(e.target.value)}
              icon={'ShowIcon'}
              name={'pwd'}
              error={false}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
            />
          </div>

          <div className={`${styles.box} mb-20`}>
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>

          <p className={`${styles.text} text text_type_main-default`}>Вы — новый пользователь? <Link><span className={styles.link}>Зарегистрироваться</span></Link></p>
          <p className={`${styles.text} text text_type_main-default`}>Забыли пароль? <Link><span className={styles.link}> Восстановить пароль</span></Link></p>

        </form>

      </div>
    </div>
  );
}
