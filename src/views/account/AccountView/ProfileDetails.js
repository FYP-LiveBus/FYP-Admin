import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {saveUser} from 'src/Redux/actions'
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
import axios from 'axios';

const states = [
  {
    value: 'Lahore',
    label: 'Lahore'
  },
  {
    value: 'Karachi',
    label: 'Karachi'
  },
  {
    value: 'Islamabad',
    label: 'Islamabad'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    firstName: state.user.firstname,
    lastName: state.user.lastname,
    email: state.user.email,
    role:state.user.role,
    phone: state.user.phonenumber,
    state: '',
    country: 'Pakistan'

  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const saveHandler = () => {

    console.log(values)
    console.log(state.user.user_id)
    axios.put(`https://livebusapi.herokuapp.com/api/users/${state.user.user_id}`, 
    {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      role: values.role,
      phone: values.phonenumber,
      // username: values.username,
      
    })
    .then( response => {
      console.log(response.data)
      dispatch(saveUser(response.data));

    })
    .catch(err=>{
      alert(err);
    });
    
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
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="User Role"
                name="role"
                onChange={handleChange}
                required
                value={values.role}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button onClick={saveHandler} color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
