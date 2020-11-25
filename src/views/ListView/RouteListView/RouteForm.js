import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {addRoute} from 'src/Redux/actions';

const stops = [
  {
    value: 'Shahdara',
    label: 'Shahdara'
  },
  {
    value: 'Minar-e-Pakistan',
    label: 'Minar-e-Pakistan'
  },
  {
    value: 'Gulshan-e-Ravi',
    label: 'Gulshan-e-Ravi'
  },
  {
    value: 'Muslim Town',
    label: 'Muslim Town'
  }
];

const driversList = [
  {
    value: 'Akmal Qasim',
    label: 'Akmal Qasim'
  },
  {
    value: 'Anwar Saleem',
    label: 'Anwar Saleem'
  },
  {
    value: 'Junaid Aziz',
    label: 'Junaid Aziz'
  }
];

const status = [
  {
    value: 'Active',
    label: 'Active'
  },
  {
    value: 'InActive',
    label: 'InActive'
  }
]

const useStyles = makeStyles(() => ({
  root: {}
}));

const RouteForm = ({ className, closeModal, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    routeNo: '',
    startingPoint: '',
    endingPoint: 'Comsats',
    noOfStops: 0,
    stops: [],
    driversList:[],
    status:'',
    // driver:''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };


  const dispatch = useDispatch()

  const saveHandler = () => {
    console.log(values);
    axios.post("https://livebusapi.herokuapp.com/api/admin/routes/",
    {
      routeNo: values.routeNo,
      routeName: values.routeName,
      startingPoint: values.startingPoint,
      noOfStops: values.noOfStops,
      stops: [],
      status: values.status,
      driver: values.drivers
    })
      .then(response=>{
        let route = response.data
        // alert(response.data);
        console.log(response.data)
        dispatch(addRoute(route));
      })
      .catch(err=>{
        alert(err)
      })
      closeModal()
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Route No"
                name="routeNo"
                onChange={handleChange}
                required
                type="number"
                value={values.routeNo}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Route Name"
                name="routeName"
                onChange={handleChange}
                required
                value={values.routeName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="No Of Stops"
                name="noOfStops"
                onChange={handleChange}
                type="number"
                required
                value={values.noOfStops}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Starting Point"
                name="startingPoint"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.startingPoint}
                variant="outlined"
              >
                {stops.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Driver"
                name="driver"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.driversList}
                variant="outlined"
              >
                {driversList.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                onChange={handleChange}
                required
                // select
                // SelectProps={{ native: true }}
                value={values.status}
                variant="outlined"
              >
                {/* {status.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))} */}
              </TextField>
              </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}> 
          <Button style={{marginRight:10}} color="primary" variant="contained" onClick={()=>saveHandler()}>
            Save details
          </Button>
          <Button color="secondary" variant="contained" onClick={()=>closeModal()}>
            Cancel
          </Button>
        </Box>
      </Card>
    </form>
    
  );
};

RouteForm.propTypes = {
  className: PropTypes.string
};

export default RouteForm;
