import React from 'react';
import logoUpdate from 'src/images/logoUpdate.png'
import {
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  avt: {
    cursor: 'pointer',
    width: 60,
    height: 60
  },
}));


const Logo = props => {
  const classes = useStyles();
  return <img alt="Logo" src="/static/logo.svg" {...props} />;
  // return <img src={logoUpdate} className={classes.avt} /> 
};

export default Logo;
