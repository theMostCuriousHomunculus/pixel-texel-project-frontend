import React from 'react';
import MUIAppBar from '@material-ui/core/AppBar';
import MUIButton from '@material-ui/core/Button';
import MUIToolbar from '@material-ui/core/Toolbar';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import AuthenticateForm from './AuthenticateForm';
import theme from '../theme';
import { AuthenticationContext } from '../Contexts/authentication-context';

const useStyles = makeStyles({
  appBar: {
    background: `radial-gradient(${theme.palette.secondary.light}, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
  },
  titleText: {
    color: theme.palette.warning.main,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.warning.light
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8
  },
  warningButton: {
    background: theme.palette.warning.main,
    color: '#eeeeee',
    '&:hover': {
      background: theme.palette.warning.light
    }
  }
});

function Header (props) {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const { history } = props;
  const [dialogueDisplayed, setDialogueDisplayed] = React.useState(false);

  return (
    <React.Fragment>
      <MUIAppBar className={classes.appBar} position="static">
        <MUIToolbar className={classes.toolbar}>
          <MUITypography
            className={classes.titleText}
            onClick={() => history.push('/')}
            variant="h2"
          >
            Chat App
          </MUITypography>
          {authentication.isLoggedIn ?
            <MUIButton
              className={classes.warningButton}
              onClick={authentication.logout}
              size="large"
              variant="contained"
            >
              Logout
            </MUIButton> :
            <MUIButton
            className={classes.warningButton}
            onClick={() => setDialogueDisplayed(true)}
            size="large"
            variant="contained"
          >
            Login / Register
          </MUIButton>
          }
        </MUIToolbar>
      </MUIAppBar>
      <AuthenticateForm
        open={dialogueDisplayed}
        toggleOpen={() => setDialogueDisplayed(false)}
      />
    </React.Fragment>
  );
}

export default withRouter(Header);