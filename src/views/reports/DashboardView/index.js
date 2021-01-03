import React, {useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TotalDrivers from './TotalDrivers';
import TotalConductors from './TotalConductors';
import TotalBuses from './TotalBuses';
import TotalStudents from './TotalStudents';
import MapView from '../../maps/mapView3';
import { useSelector, useDispatch } from 'react-redux'
import { countDrivers, countConductors, countStudents, countBuses } from 'src/Redux/actions';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    axios.get(`https://livebusapi.herokuapp.com/api/admin/drivers/getTotal`)
    .then(response => {
      dispatch(countDrivers(response.data))
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  useEffect(()=>{
    axios.get(`https://livebusapi.herokuapp.com/api/admin/conductors/getTotal`)
    .then(response => {
      dispatch(countConductors(response.data))
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  useEffect(()=>{
    axios.get(`https://livebusapi.herokuapp.com/api/admin/students/`)
    .then(response => {
      dispatch(countStudents(response.data))
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },[]);
  
  useEffect(()=>{
    axios.get(`https://livebusapi.herokuapp.com/api/admin/buses/getTotal`)
    .then(response => {
      dispatch(countBuses(response.data))
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },[]);

  const state = useSelector(state => state)

  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalDrivers count={state.totalNoOfDrivers} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalConductors count={state.totalNoOfConductors} />           
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalBuses count={state.totalNoOfBuses} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalStudents count={state.totalNoOfStudents} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            {/* < MapView/> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
