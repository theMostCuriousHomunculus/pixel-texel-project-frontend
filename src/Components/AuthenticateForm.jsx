import React from 'react';
import MUIButton from '@material-ui/core/Button';
import MUIDialog from '@material-ui/core/Dialog';
import MUIDialogActions from '@material-ui/core/DialogActions';
import MUIDialogContent from '@material-ui/core/DialogContent';
import MUIDialogContentText from '@material-ui/core/DialogContentText';
import MUIDialogTitle from '@material-ui/core/DialogTitle';
import MUITextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../theme';
import { AuthenticationContext } from '../Contexts/authentication-context';
import { useRequest } from '../Hooks/request-hook';
import LoadingSpinner from './LoadingSpinner';

const useStyles = makeStyles({
  dialogueContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  warningButton: {
    background: theme.palette.warning.main,
    color: '#eeeeee',
    '&:hover': {
      background: theme.palette.warning.light
    }
  }
});

const AuthenticateForm = (props) => {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [mode, setMode] = React.useState('Login');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { loading, errorMessage, sendRequest, clearError } = useRequest();

  async function login () {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/login`,
        'PATCH',
        JSON.stringify({
          email,
          password
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      authentication.login(response.token, response.userId);
      props.toggleOpen();
    } catch (error) {

    }
  }

  async function register () {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user`,
        'POST',
        JSON.stringify({
          email,
          name,
          password
        }),
        {
          'Content-Type': 'application/json'
        }
      );
        
      authentication.login(response.token, response.userId);
      props.toggleOpen();
    } catch (error) {

    }
  }

  function toggleMode (prevState) {
    if (prevState === 'Login') {
      setMode('Register');
    } else {
      setMode('Login');
    }
  }

  return (
    <React.Fragment>
      <MUIDialog
        open={!!errorMessage}
        onClose={clearError}
      >
        <MUIDialogTitle>Error</MUIDialogTitle>
        <MUIDialogContent>
          <MUIDialogContentText>{errorMessage}</MUIDialogContentText>
        </MUIDialogContent>
        <MUIDialogActions>
          <MUIButton color="primary" onClick={clearError} variant="contained">Try Again</MUIButton>
        </MUIDialogActions>
      </MUIDialog>

      <MUIDialog
        open={props.open}
        onClose={props.toggleOpen}
      >
        <MUIDialogTitle>
          {mode}
        </MUIDialogTitle>
        {loading ?
          <LoadingSpinner /> :
          <React.Fragment>
            <MUIDialogContent>
              <MUITextField
                autoComplete="off"
                autoFocus
                fullWidth
                label="Email Address"
                onChange={(event) => setEmail(event.target.value)}
                required={true}
                type="email"
                value={email}
                variant="outlined"
              />
              {mode === 'Register' &&
                <MUITextField
                  autoComplete="off"
                  fullWidth
                  label="Account Name"
                  onChange={(event) => setName(event.target.value)}
                  required={true}
                  style={{ marginTop: 16 }}
                  type="text"
                  value={name}
                  variant="outlined"
                />
              }
              <MUITextField
                autoComplete="off"
                fullWidth
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
                required={true}
                style={{ marginTop: 16 }}
                type="password"
                value={password}
                variant="outlined"
              />
            </MUIDialogContent>
            <MUIDialogActions>
              <MUIButton
                className={classes.warningButton}
                onClick={() => toggleMode(mode)}
                variant="contained"
              >
                {mode === 'Login' ? "Don't have an account yet?" : 'Already have an account?'}
              </MUIButton>
              <MUIButton
                color="secondary"
                onClick={mode === 'Login' ? login : register}
                variant="contained"
              >
                {mode}!
              </MUIButton>
            </MUIDialogActions>
          </React.Fragment>
        }
      </MUIDialog>
    </React.Fragment>
  );
}

export default AuthenticateForm;