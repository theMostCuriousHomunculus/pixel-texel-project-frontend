import React from 'react';
import MUICircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  loadingContainer: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  }
});

const LoadingSpinner = () => {

  return (
    <div className={useStyles().loadingContainer}>
      <MUICircularProgress size={100} />
    </div>
  );
};

export default LoadingSpinner;