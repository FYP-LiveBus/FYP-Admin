import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { saveUser } from 'src/Redux/actions';

const useStyles = makeStyles({
  root: {}
});

const Password = ({ user, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    city: user.city,
    role: user.role,
    phonenumber: user.phonenumber,
    password: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const dispatch = useDispatch();

  const updateHandler = () => {
    if (values.password === values.confirm) {
      axios
        .put(
          `https://livebusapi.herokuapp.com/api/users/updatePassword/${user._id}`,
          {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            city: user.city,
            role: user.role,
            phonenumber: user.phonenumber,
            password: values.password
          }
        )
        .then(response => {
          dispatch(saveUser(response.data));
          alert('Password updated successfully');
        })
        .catch(err => alert(err));
    } else alert("Password didn't match... Try again.");
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              updateHandler();
            }}
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
