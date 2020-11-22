import React from 'react';
import { useHistory } from 'react-router-dom';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardActions from '@material-ui/core/CardActions';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICreateIcon from '@material-ui/icons/Create';
import MUIDeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MUIGrid from '@material-ui/core/Grid';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import LoadingSpinner from '../Components/LoadingSpinner';
import NewBoardForm from '../Components/NewBoardForm';
import theme from '../theme';
import { AuthenticationContext } from '../Contexts/authentication-context';
import { useRequest } from '../Hooks/request-hook';

const useStyles = makeStyles({
  fullHeight: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& .MuiCardHeader-root': {
      flexGrow: 1
    }
  },
  iconButton: {
    height: 40
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  warningButton: {
    backgroundColor: theme.palette.warning.main,
    color: '#eeeeee',
    '&:hover': {
      backgroundColor: theme.palette.warning.light
    }
  },
});

const Home = () => {

  const [messageBoards, setMessageBoards] = React.useState([]);
  const [dialogueDisplayed, setDialogueDisplayed] = React.useState(false);
  const { loading, sendRequest } = useRequest();
  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    async function fetchMessageBoards () {
      try {
        const messageBoardsData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/board`, 'GET', null, {});
        setMessageBoards(messageBoardsData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMessageBoards();
  }, [sendRequest]);

  async function deleteMessageBoard (boardId) {
    try {
      const remainingMessageBoards = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/board/${boardId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authentication.token
        }
      );
      setMessageBoards(remainingMessageBoards);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      {loading ?
        <LoadingSpinner /> :
        <MUIGrid container spacing={2}>
          {authentication.isLoggedIn &&
            <React.Fragment>
              <NewBoardForm
                open={dialogueDisplayed}
                toggleOpen={() => setDialogueDisplayed(false)}
              />
              <MUIGrid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MUICard className={classes.fullHeight}>
                  <MUICardHeader
                    title={<MUITypography variant="subtitle1">Create a New Message Board</MUITypography>}
                    subheader={<MUITypography color="textSecondary" variant="subtitle2">The world eagerly awaits your opinions on stuff...</MUITypography>}
                  />
                  <MUICardActions>
                    <MUIButton
                      className={classes.iconButton}
                      color="primary"
                      onClick={() => setDialogueDisplayed(true)}
                      variant="contained"
                    >
                      <MUICreateIcon />
                    </MUIButton>
                  </MUICardActions>
                </MUICard>
              </MUIGrid>
            </React.Fragment>
          }
          {messageBoards.map(function (board) {
            return (
              <MUIGrid item key={board._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <MUICard className={classes.fullHeight}>
                  <MUICardHeader
                    title={<MUITypography variant="subtitle1">{board.name}</MUITypography>}
                    subheader={<MUITypography color="textSecondary" variant="subtitle2">Started by: {board.founder.name}</MUITypography>}
                  />
                  <MUICardActions className={board.founder._id === authentication.userId ? classes.spaceBetween : null}>
                    {board.founder._id === authentication.userId &&
                      <MUIButton
                        className={classes.warningButton}
                        onClick={() => deleteMessageBoard(board._id)}
                        startIcon={<MUIDeleteForeverIcon />}
                        variant="contained"
                      >
                        Delete
                      </MUIButton>
                    }
                    <MUIButton
                      color="secondary"
                      onClick={() => history.push(`/${board._id}`)}
                      variant="contained"
                    >
                      Join
                    </MUIButton>
                  </MUICardActions>
                </MUICard>
              </MUIGrid>
            );
          })}
        </MUIGrid>
      }
    </React.Fragment>
  );
}

export default Home;