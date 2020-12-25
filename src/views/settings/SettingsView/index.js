import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Notifications from './Notifications';
import Password from './Password';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const state = useSelector(state => state)

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth="md">
        {/* <Notifications /> */}
        <Box mt={3}>
          <Password user={state.user} />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;