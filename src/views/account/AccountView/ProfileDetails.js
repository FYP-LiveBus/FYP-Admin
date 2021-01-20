import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveUser } from 'src/Redux/actions';
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

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ user, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    role: user.role,
    phonenumber: user.phonenumber,
    city: user.city
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const saveHandler = () => {
    console.log(values);
    console.log(user._id);
    axios
      .put(`https://livebusapi.herokuapp.com/api/users/${user._id}`, {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        username: values.username,
        role: values.role,
        phonenumber: values.phonenumber,
        city: values.city
      })
      .then(response => {
        // console.log(response.data);
        dispatch(saveUser(response.data));
        alert('Updated Successfully');
      })
      .catch(err => {
        alert(err);
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
                helperText="Please specify the first name"
                label="First name"
                name="firstname"
                onChange={handleChange}
                required
                value={values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastname"
                onChange={handleChange}
                required
                value={values.lastname}
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
                label="Role"
                name="role"
                onChange={handleChange}
                required
                disabled="true"
                value={values.role}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phonenumber"
                onChange={handleChange}
                type="number"
                required
                value={values.phonenumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
              {/* <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              /> */}
              {/* {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))} */}
              {/* </TextField> */}
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
