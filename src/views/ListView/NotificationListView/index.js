import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
// import Toolbar from './Toolbar';
import MyModal from 'src/components/modal';
import data from './data';

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
  const [students] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Notification"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <MyModal case={'N'} name={"Notification"}/>
        <Box mt={3}>
          <Results students={students} />
        </Box>
      </Container>
    </Page>
  );
};

export default NotificationListView;
