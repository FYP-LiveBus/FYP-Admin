import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  // CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addNotification } from 'src/Redux/actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const NotificationForm = ({ className, closeModal, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    subject: '',
    message: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const dispatch = useDispatch();

  const saveHandler = () => {
    console.log(values);
    axios
      .post('https://livebusapi.herokuapp.com/api/admin/notifications/', {
        subject: values.subject,
        message: values.message
      })
      .then(response => {
        let notification = response.data;
        // alert(response.data);
        console.log(response.data);
        dispatch(addNotification(notification));
      })
      .catch(err => {
        alert(err);
      });
    closeModal();
  };

  //////////////////////213123123123123kj12lk3jl21j3lnj12l3j12lj3l12nj312k

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={5} xs={12}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                onChange={handleChange}
                required
                value={values.subject}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                multiline
                label="Message Text"
                name="message"
                onChange={handleChange}
                required
                value={values.message}
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
            Send
          </Button>
        </Box>
      </Card>
    </form>
  );
};

NotificationForm.propTypes = {
  className: PropTypes.string
};

export default NotificationForm;
