import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const StopListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  const [searchStop, setSearchStop] = useState(state.stops);
  useEffect(() => {
    setSearchStop(state.stops);
  }, [state.stops]);

  return (
    <Page className={classes.root} title="Stop">
      <Container maxWidth={false}>
        <Toolbar setSearchStop={setSearchStop} dataStop={state.stops} />
        <Box mt={3}>
          <Results stops={searchStop} />
        </Box>
      </Container>
    </Page>
  );
};

export default StopListView;
