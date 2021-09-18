import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../services/utils';

export function ProtectedRoute({ children, ...rest }) {
  const [isUserLogined, setIsUserLogined] = useState(false);
  const [haveUser, setHaveUser] = useState(null);

  const init = () => {
    const token = getCookie('refreshToken');
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
}
