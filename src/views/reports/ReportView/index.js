import React, { useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { useSelector, useDispatch } from 'react-redux';
import TotalStudents from './TotalStudents';
import TotalTrips from './TotalTrips';
import TrafficByDevice from './TrafficByDevice';
import RecentTrips from './RecentTrips';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Reports = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   axios
  //     .get(`https://livebusapi.herokuapp.com/api/admin/drivers/getTotal`)
  //     .then(response => {
  //       dispatch(countDrivers(response.data));
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://livebusapi.herokuapp.com/api/admin/conductors/getTotal`)
  //     .then(response => {
  //       dispatch(countConductors(response.data));
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://livebusapi.herokuapp.com/api/admin/students/`)
  //     .then(response => {
  //       dispatch(countStudents(response.data));
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(`https://livebusapi.herokuapp.com/api/admin/buses/getTotal`)
  //     .then(response => {
  //       dispatch(countBuses(response.data));
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // const state = useSelector(state => state);

  const classes = useStyles();
  const [flag, setFlag] = React.useState('');

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
            <TotalStudents />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalStudents />
          </Grid>

          <Grid item lg={8} md={12} xl={12} xs={12}>
            {/* {decider()} */}
            <RecentTrips />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <TrafficByDevice />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Reports;
