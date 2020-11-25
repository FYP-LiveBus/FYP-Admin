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

const SubAdminForm = ({ className, closeModal, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    // age: '',
    // dateOfBirth: '',
    // city: '',
    profilePicture: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
                label="Username"
                name="username"
                onChange={handleChange}
                required
                value={values.username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                value={values.age}
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
                required
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                onChange={handleChange}
                type="date"
                value={values.dateOfBirth}
                variant="outlined"
              /> 
            </Grid>*/}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select City"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.city}
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
          <Button style={{marginRight:10}} color="primary" variant="contained" onClick={()=>closeModal()}>
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

SubAdminForm.propTypes = {
  className: PropTypes.string
};

export default SubAdminForm;
