import React from 'react';
import MUITypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

import theme from '../theme';

const useStyles = makeStyles({
  footer: {
    alignItems: 'center',
    background: `radial-gradient(${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: '#eeeeee',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    justifyContent: 'center',
    padding: 8,
    textAlign: 'center',
    width: '100%',
    '& a': {
      color: '#0000ff'
    }
  }
})

const Footer = () => {
  return (
    <footer className={useStyles().footer}>
      <MUITypography variant="body2">This chat application was built by Casey Johnson in 2020 as a part of the application process for a React developer position at <a href="https://www.pixelandtexel.com/">Pixel and Texel LLC</a>.</MUITypography>
      <MUITypography variant="body2">It is a MERN stack application (MongoDB, Express, React, Node) and incorporates many components from the Material UI library.</MUITypography>
      <MUITypography variant="body2">Statements made in chat rooms on this site are not monitored or restricted and should not be taken as an endorsement of any kind by either Pixel and Texel or Casey Johnson.</MUITypography>
      <MUITypography variant="body2">It is not intended to be used commercially, at scale, to communicate privately or to preserve important information.</MUITypography>
    </footer>
  );
};

export default Footer;