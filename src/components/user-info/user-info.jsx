import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-info.module.css';
import { useCallback, useEffect } from 'react';
import { EDIT_USER, getUser, refreshToken, saveUserEdit } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export function UserInfo() {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = user.userInfo;
  const refreshStatus = user.getUser.needRefresh;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (refreshStatus) {
      dispatch(refreshToken());
    }
    if (user.getToken.refreshSuccess) {
      dispatch(getUser());
    }
  }, [refreshStatus]);

  const onChange = e => {
    dispatch({
      type: EDIT_USER,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveUserInfo = useCallback(
    e => {
      e.preventDefault();
      dispatch(saveUserEdit(userInfo));
    }, [dispatch, userInfo]
  );

  return (
    <form className={styles.form} onSubmit={handleSaveUserInfo}>
      <div className={`${styles.box} mt-6 mb-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          errorText={'Ошибка'}
          icon={'EditIcon'}
          value={userInfo.name}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.box} mb-6`}>
        <Input
          type={'text'}
          placeholder={'Логин'}
          name={'email'}
          errorText={'Ошибка'}
          icon={'EditIcon'}
          value={userInfo.email}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.box} mb-6`}>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          icon={'EditIcon'}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          value={userInfo.password}
          onChange={onChange}
        />
      </div>

      <div className={`${styles.box} mb-20`}>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
