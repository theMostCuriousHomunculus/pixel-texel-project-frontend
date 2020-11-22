import React from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import MUIButton from '@material-ui/core/Button';
import MUICard from '@material-ui/core/Card';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUICardActions from '@material-ui/core/CardActions';
import MUITextField from '@material-ui/core/TextField';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ExistingMessage from '../Components/ExistingMessage';
import { AuthenticationContext } from '../Contexts/authentication-context';

const useStyles = makeStyles({
  stretch: {
    alignSelf: 'stretch'
  }
});

const messageBoardReducer = (state, action) => {
  switch (action.type) {
    case 'APPEND':
      return {
        ...state,
        messages: [...state.messages].concat(action.value)
      }
    case 'POPULATE':
      return {
        ...state,
        ...action.value
      }
    default:
      return state;
  }
};

const MessageBoard = () => {

  const authentication = React.useContext(AuthenticationContext);
  const boardId = useParams().boardId;
  const bodyInput = React.useRef();
  const classes = useStyles();
  const [messageBoard, dispatch] = React.useReducer(messageBoardReducer, {
    _id: boardId,
    founder: {
      _id: '',
      name: ''
    },
    messages: [],
    name: ''
  });
  const [socket, setSocket] = React.useState();

  React.useEffect(function () {
    if (socket) {
      socket.emit('join', boardId);

      socket.on('admitted', function (messageBoardData) {
        dispatch({ type: 'POPULATE', value: messageBoardData });
      });

      socket.on('receiveMessage', function (newMessage) {
        dispatch({ type: 'APPEND', value: newMessage });
        autoScroll();
      });

      return function () {
        socket.emit('leave', boardId);
        socket.disconnect();
      }
    }
    setSocket(io(process.env.REACT_APP_BACKEND_URL.replace('/api', '')));
  }, [boardId, socket]);

  function autoScroll () {
    const messageList = document.getElementById('message-list');
    const latestMessage = messageList.lastElementChild;
    const latestMessageStyles = getComputedStyle(latestMessage);
    const latestMessageTopMargin = parseInt(latestMessageStyles.marginTop);
    const latestMessageBottomMargin = parseInt(latestMessageStyles.marginBottom);
    const latestMessageHeight = latestMessage.offsetHeight + latestMessageTopMargin + latestMessageBottomMargin;

    const visibleHeight = messageList.offsetHeight;
    const containerHeight = messageList.scrollHeight;
    const scrollOffset = messageList.scrollTop + visibleHeight;

    if (containerHeight - latestMessageHeight <= scrollOffset) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }

  function sendMessage () {
    socket.emit('sendMessage', boardId, authentication.token, bodyInput.current.value);
    bodyInput.current.value = '';
    bodyInput.current.focus();
  }

  return (
    <MUICard>
      <MUICardHeader
        disableTypography={true}
        title={<MUITypography variant="h3">{messageBoard.name}</MUITypography>}
        subheader={<MUITypography variant="h4">Started by: {messageBoard.founder.name}</MUITypography>}
      />
      <MUICardContent id="message-list">
        {messageBoard.messages.map(function (message) {
          return <ExistingMessage message={message} key={message._id} />;
        })}
      </MUICardContent>
      {authentication.isLoggedIn &&
        <MUICardActions>
          <MUITextField
            autoComplete="off"
            fullWidth
            inputRef={bodyInput}
            multiline
            rows={3}
            type="text"
            variant="outlined"
          />
          <MUIButton
            className={classes.stretch}
            color="primary"
            onClick={sendMessage}
            variant="contained"
          >
            Preach!
          </MUIButton>
        </MUICardActions>
      }
    </MUICard>
  );
};

export default MessageBoard;