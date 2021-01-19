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

const BusListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  const [searchBus, setSearchBus] = useState(state.bus);
  useEffect(() => {
    setSearchBus(state.bus);
  }, [state.bus]);

  return (
    <Page className={classes.root} title="Bus">
      <Container maxWidth={false}>
        <Toolbar setSearchBus={setSearchBus} dataBus={state.bus} />
        <Box mt={3}>
          <Results buses={searchBus} />
        </Box>
      </Container>
    </Page>
  );
};

export default BusListView;
