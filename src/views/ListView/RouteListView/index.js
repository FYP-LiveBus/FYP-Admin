import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
// import data from './data';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RouteListView = () => {
  const classes = useStyles();
  // const [students] = useState(data);
  const state = useSelector(state => state)

  return (
    <Page
      className={classes.root}
      title="Student"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results routes={state.routes} />
        </Box>
      </Container>
    </Page>
  );
};

export default RouteListView;
