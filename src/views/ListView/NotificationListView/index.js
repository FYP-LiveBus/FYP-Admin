import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
// import Toolbar from './Toolbar';
import MyModal from 'src/components/modal';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const NotificationListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state)

  return (
    <Page
      className={classes.root}
      title="Notification"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <MyModal case={'N'} name={"Notification"}/>
        <Box mt={3}>
          <Results notifications={state.notifications} />
        </Box>
      </Container>
    </Page>
  );
};

export default NotificationListView;
