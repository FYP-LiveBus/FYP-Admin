import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
// import {useDispatch } from 'react-redux';
import TotalStudents from './TotalStudents';
import TotalTrips from './TotalTrips';
import TotalRoutes from './TotalRoutes';
import TrafficByDevice from './TrafficByDevice';
import RecentTrips from './RecentTrips';
import RecentStopHistory from './RecentStopHistory';
import TotalStops from './TotalStops';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Reports = () => {
  const classes = useStyles();
  // const [flag, setFlag] = React.useState('');

  // const decider = () => {
  //   if (flag == '') return '';
  //   else if (flag == 'student') {
  //     return <TrafficByDevice />;
  //   } else if (flag == 'trips') {
  //     return (
  //       <>
  //         <RecentTrips />
  //         <TrafficByDevice />
  //       </>
  //     );
  //   }
  // };

  // alert(flag);
  return (
    <Page className={classes.root} title="Reports">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalStudents />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTrips />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalRoutes />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalStops />
          </Grid>

          <Grid item lg={8} md={12} xl={12} xs={12}>
            {/* {decider()} */}
            <RecentTrips />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <TrafficByDevice />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <RecentStopHistory />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Reports;
