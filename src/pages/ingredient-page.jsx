import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export function IngredientPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);



  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <p>{id}</p>

      </div>
    </div>
  );
}
