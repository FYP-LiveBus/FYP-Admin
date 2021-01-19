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
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addDriver, editDriver } from 'src/Redux/actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const DriverForm = ({ className, closeModal, flag, data, index, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phone: '',
    age: 0,
    licensenumber: '',
    email: '',
    city: '',
    profilePicture: ''
  });

  useEffect(() => {
    if (data) setValues(data);
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const dispatch = useDispatch();

  const saveHandler = () => {
    console.log(values);

    if (flag && flag == 'edit') {
      axios
        .put(`https://livebusapi.herokuapp.com/api/admin/drivers/${data._id}`, {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          password: values.password,
          phone: values.phone,
          email: values.email,
          licensenumber: values.licensenumber,
          age: values.age,
          city: values.city,
          profilePicture: values.profilePicture
        })
        .then(response => {
          const user = response.data;
          alert('Driver Updated successfully');
          dispatch(editDriver(user, index));
          // alert(JSON.stringify(response.data));
        })
        .catch(err => {
          alert(err + 'check');
        });
    } else {
      axios
        .post('https://livebusapi.herokuapp.com/api/admin/drivers/', {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          password: values.password,
          phone: values.phone,
          email: values.email,
          licensenumber: values.licensenumber,
          age: values.age,
          city: values.city,
          profilePicture: values.profilePicture
        })
        .then(response => {
          let user = response.data;
          // console.log(response.data);
          // console.log(user.email);
          dispatch(addDriver(user));
          alert('Driver added successfully.');
        })
        .catch(err => {
          alert(err);
        });
    }
    closeModal();
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
                label="First Name"
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
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                required
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                onChange={handleChange}
                type="number"
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="License Number"
                name="licensenumber"
                onChange={handleChange}
                value={values.licensenumber}
                required
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
                // select
                // SelectProps={{ native: true }}
                value={values.city}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            style={{ marginRight: 10 }}
            color="primary"
            variant="contained"
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => saveHandler()}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

DriverForm.propTypes = {
  className: PropTypes.string
};

export default DriverForm;
