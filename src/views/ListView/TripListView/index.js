import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
// import Toolbar from './Toolbar';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const TripListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state)
  
  return (
    <Page
      className={classes.root}
      title="Trips"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3}>
          <Results trips={state.trips} />
        </Box>
      </Container>
    </Page>
  );
};

export default TripListView;
