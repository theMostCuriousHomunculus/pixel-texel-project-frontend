import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './Components/Footer';
import Header from './Components/Header';
import LoadingSpinner from './Components/LoadingSpinner';

import { AuthenticationContext } from './Contexts/authentication-context';
import { useRequest } from './Hooks/request-hook';

const Home = React.lazy(() => import('./Pages/Home'));
const MessageBoard = React.lazy(() => import('./Pages/MessageBoard'));

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    height: '100%',
    margin: 'auto',
    width: '100%'
  }
});

function App() {

  const classes = useStyles();
  const { sendRequest } = useRequest();

  const [token, setToken] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  const login = React.useCallback((tkn, uid) => {
    setToken(tkn);
    Cookies.set('authentication_token', tkn);
    setUserId(uid);
    Cookies.set('user_id', uid);
  }, []);

  const logout = React.useCallback(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/logout`,
      'PATCH',
      null,
      {
        Authorization: 'Bearer ' + Cookies.get('authentication_token')
      }
    );
    setToken(null);
    Cookies.remove('authentication_token');
    setUserId(null);
    Cookies.remove('user_id');
  }, [sendRequest]);

  React.useEffect(() => {
    if (Cookies.get('user_id') && Cookies.get('authentication_token')) {
      login(Cookies.get('authentication_token'), Cookies.get('user_id'));
    }
  }, [login]);

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        token,
        userId
      }}
    >
      <BrowserRouter>
        <Header />
        <main className={classes.main}>
          <React.Suspense 
            fallback={<LoadingSpinner />}
          >
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/:boardId'>
                <MessageBoard />
              </Route>
            </Switch>
          </React.Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthenticationContext.Provider>
  );
}

export default App;
