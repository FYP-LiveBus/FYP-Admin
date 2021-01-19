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

const ConductorListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  const [searchConductor, setSearchConductor] = useState(state.conductors);
  useEffect(() => {
    setSearchConductor(state.conductors);
  }, [state.conductors]);

  return (
    <Page className={classes.root} title="Conductors">
      <Container maxWidth={false}>
        <Toolbar
          setSearchConductor={setSearchConductor}
          dataConductor={state.conductors}
        />
        <Box mt={3}>
          <Results conductors={searchConductor} />
        </Box>
      </Container>
    </Page>
  );
};

export default ConductorListView;
