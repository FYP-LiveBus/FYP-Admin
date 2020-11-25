import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import {useSelector} from 'react-redux'
// import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SubAdminListView = () => {
  const classes = useStyles();
  // const [students] = useState(data);
  const state = useSelector(state => state)
  console.log(state.subadmins)
  return (
    <Page
      className={classes.root}
      title="SubAdmin"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results subadmins={state.subadmins} />
        </Box>
      </Container>
    </Page>
  );
};

export default SubAdminListView;
