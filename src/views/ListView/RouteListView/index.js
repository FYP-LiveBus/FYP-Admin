import React, { useEffect, useState } from 'react';
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

const RouteListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  const [searchRoute, setSearchRoute] = useState(state.routes);
  useEffect(() => {
    setSearchRoute(state.routes);
  }, [state.routes]);

  return (
    <Page className={classes.root} title="Routes">
      <Container maxWidth={false}>
        <Toolbar setSearchRoute={setSearchRoute} dataRoute={state.routes} />
        <Box mt={3}>
          <Results routes={searchRoute} />
        </Box>
      </Container>
    </Page>
  );
};

export default RouteListView;
