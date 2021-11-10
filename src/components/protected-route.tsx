import { useEffect, useState, FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../services/utils';
import { TEmptyFunc, THaveToken, THaveUser, TProtectedRoute } from '../services/types';

export const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
  const [isUserLogined, setIsUserLogined] = useState<boolean>(false);
  const [haveUser, setHaveUser] = useState<THaveUser>(null);

  const init: TEmptyFunc = () => {
    const token: THaveToken = getCookie('refreshToken');
    if (token) {
      setHaveUser(true);
    } else {
      setHaveUser(false);
    }
    setIsUserLogined(true);
  };


  useEffect(() => {
    init();
  }, []);

  if (!isUserLogined) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() => (
        haveUser ? (
          children
        ) : (
          <Redirect
            to='/login'
          />
        )
      )}
    />
  );
};
