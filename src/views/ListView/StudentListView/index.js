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

const StudentListView = () => {
  const classes = useStyles();
  const state = useSelector(state => state);

  const [searchStudent, setSearchStudent] = useState(state.students);
  useEffect(() => {
    setSearchStudent(state.students);
  }, [state.students]);

  return (
    <Page className={classes.root} title="Student">
      <Container maxWidth={false}>
        <Toolbar
          setSearchStudent={setSearchStudent}
          dataStudent={state.students}
        />
        <Box mt={3}>
          <Results students={searchStudent} />
        </Box>
      </Container>
    </Page>
  );
};

export default StudentListView;
