import React, { useState, useEffect } from 'react';
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
  makeStyles,
  Select, 
  MenuItem, 
  Input, 
  InputLabel
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {addRoute} from 'src/Redux/actions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400,
    },
  },
};

const useStyles = makeStyles(() => ({
  root: {}
}));

const RouteForm = ({ className, closeModal, ...rest }) => {

  // const state = useSelector(state=>state)
  const classes = useStyles();
  const [values, setValues] = useState({
    routeNo: '',
    routeName: '',
    startingPoint: '',
    endingPoint: 'Comsats',
    stops: [],
    selectiveStops: [],
    driversList:[],
    status:'',
    driver:{}
  });

  

  useEffect(() => {
    axios.get(`https://livebusapi.herokuapp.com/api/admin/drivers`)
    .then(response=>{
      setValues({...values, driversList: response.data});
    })
    .catch(err=>alert(err))
  },[])

  useEffect(() => {
    axios.get(`https://livebusapi.herokuapp.com/api/admin/stops/Active`)
    .then(response=>{
      console.log(response.data)
      setValues({...values, stops: response.data});
    })
    .catch(err=>alert(err))
  },[])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeMultiple = (event) => {
    setValues({...values, selectiveStops: event.target.value});
  };

  const dispatch = useDispatch()

  const saveHandler = () => {
    console.log(values);
    axios.post("https://livebusapi.herokuapp.com/api/admin/routes",
    {
      routeNo: values.routeNo,
      routeName: values.routeName,
      startingPoint: values.startingPoint,
      stops: values.stops,
      status: values.status,
      // drivers: values.driversList,
      driver: values.driver,
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
            <InputLabel id="demo-mutiple-name-label">Stops</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple={true}
                value={values.selectiveStops}
                onChange={handleChangeMultiple}
                input={<Input />}
                MenuProps={MenuProps}
                style={{width:"400px"}}
              >
                {values.stops.map((stop) => (
                  <MenuItem key={stop.stopName} value={stop.stopName} >
                    {stop.stopName}
                  </MenuItem>
                ))}
              </Select>
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
                {values.stops.map(stop => (
                  <option key={stop._id} value={stop.stopName}>
                    {stop.stopName}
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
                value={values.driver}
                variant="outlined"
              >
                {values.driversList.map(dr => (
                  <option key={dr._id} value={dr.username}>
                    {`${dr.firstname} ${dr.lastname}`}
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
