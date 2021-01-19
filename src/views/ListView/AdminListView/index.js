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

const AdminListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  const [searchAdmin, setSearchAdmin] = useState(state.admins);
  useEffect(() => {
    setSearchAdmin(state.admins);
  }, [state.admins]);

  return (
    <Page className={classes.root} title="Admin">
      <Container maxWidth={false}>
        <Toolbar setSearchAdmin={setSearchAdmin} dataAdmin={state.admins} />
        <Box mt={3}>
          <Results admins={searchAdmin} />
        </Box>
      </Container>
    </Page>
  );
};

export default AdminListView;
