import React from 'react';
import { useHistory } from 'react-router-dom';
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

const NewBoardForm = (props) => {

  const authentication = React.useContext(AuthenticationContext);
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = React.useState('');

  const { loading, errorMessage, sendRequest, clearError } = useRequest();

  async function createBoard () {
    try {
      const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/board`,
        'POST',
        JSON.stringify({
          name
        }),
        {
          Authorization: 'Bearer ' + authentication.token,
          'Content-Type': 'application/json'
        }
      );
        
      history.push(`/${response._id}`);
    } catch (error) {

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
          Create a New Message Board
        </MUIDialogTitle>
        {loading ?
          <LoadingSpinner /> :
          <React.Fragment>
            <MUIDialogContent>
              <MUITextField
                autoComplete="off"
                fullWidth
                label="New Message Board Name"
                onChange={(event) => setName(event.target.value)}
                required={true}
                style={{ marginTop: 16 }}
                type="text"
                value={name}
                variant="outlined"
              />
            </MUIDialogContent>
            <MUIDialogActions>
              <MUIButton
                className={classes.warningButton}
                onClick={props.toggleOpen}
                variant="contained"
              >
                Cancel
              </MUIButton>
              <MUIButton
                color="secondary"
                onClick={createBoard}
                variant="contained"
              >
                Start
              </MUIButton>
            </MUIDialogActions>
          </React.Fragment>
        }
      </MUIDialog>
    </React.Fragment>
  );
}

export default NewBoardForm;