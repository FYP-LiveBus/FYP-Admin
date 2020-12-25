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
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addStop } from 'src/Redux/actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const StopForm = ({ className, closeModal, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    stopNo: 0,
    stopName: '',
    latitude: {$numberDecimal: 0.0},
    longitude: {$numberDecimal: 0.0},
    status: ''
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
    axios.post("https://livebusapi.herokuapp.com/api/admin/stops/",
    {
      stopNo: values.stopNo,
      stopName: values.stopName,
      latitude: values.latitude,
      longitude: values.longitude,
      status: values.status,
    })
      .then(response=>{
        let user = response.data
        // alert(response.data);
        console.log(response.data)
        dispatch(addStop(user));
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
                label="Stop No"
                name="stopNo"
                onChange={handleChange}
                required
                type="number"
                value={values.stopNo}
                variant="outlined"
              />  
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                  fullWidth
                  label="Stop Name"
                  name="stopName"
                  onChange={handleChange}
                  required
                  value={values.stopName}
                  variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                  fullWidth
                  label="Latitude"
                  name="latitude"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.latitude}
                  variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                  fullWidth
                  label="Longitude"
                  name="longitude"
                  onChange={handleChange}
                  required
                  type="number"
                  value={values.longitude}
                  variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                  fullWidth
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  required
                  value={values.status}
                  variant="outlined"
                />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>    
          <Button style={{marginRight:10}} color="primary" variant="contained" onClick={()=>saveHandler()}>
            Save details
          </Button>
          <Button color="primary" variant="contained" onClick={()=>closeModal()}>
            Cancel
          </Button>
        </Box>
      </Card>
    </form>
    
  );
};

StopForm.propTypes = {
  className: PropTypes.string
};

export default StopForm;
