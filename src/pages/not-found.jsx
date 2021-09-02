import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export function NotFound404() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.content}>
          <h1 className={`${styles.title} text text_type_main-large text_color_inactive`}>Oops! 404 Error</h1>
          <p className="pl-2 text text_type_main-default">Страница не найдена</p>
          <p className="pl-2 text text_type_main-default">Проверьте адрес  </p>
          <p className="pl-2 text text_type_main-default"> или вернитесь <Link to='/' className={styles.link}>в начало</Link> </p>
        </div>
      </div>
    </div>
  );
}
