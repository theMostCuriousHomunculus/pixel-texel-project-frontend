import React from 'react';
import MUICard from '@material-ui/core/Card';
import MUICardContent from '@material-ui/core/CardContent';
import MUICardHeader from '@material-ui/core/CardHeader';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import theme from '../theme';
import { AuthenticationContext } from '../Contexts/authentication-context';

const useStyles = makeStyles({
  fromMe: {
    background: theme.palette.secondary.main,
    margin: '8px 0 0 5%',
    textAlign: 'right'
  },
  fromOther: {
    background: '#d3d3d3',
    margin: '8px 5% 0 0'
  },
  warningButton: {
    backgroundColor: theme.palette.warning.main,
    color: '#eeeeee',
    '&:hover': {
      backgroundColor: theme.palette.warning.dark
    }
  }
});

const ExistingMessage = (props) => {

  const authentication = React.useContext(AuthenticationContext);
  const classes = useStyles();

  return (
    <MUICard className={props.message.author._id === authentication.userId ? classes.fromMe : classes.fromOther}>
      <MUICardHeader
        disableTypography={true}
        title={<MUITypography color="textPrimary" variant="body1">{props.message.author.name}</MUITypography>}
        subheader={<MUITypography color="textSecondary" variant="body2">{new Date(props.message.createdAt).toLocaleString()}</MUITypography>}
      />
      <MUICardContent>
        <MUITypography variant="body1">{props.message.body}</MUITypography>
      </MUICardContent>
    </MUICard>
  );
};

export default ExistingMessage;