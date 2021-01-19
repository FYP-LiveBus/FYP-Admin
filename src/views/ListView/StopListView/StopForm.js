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
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addStop, editStop } from 'src/Redux/actions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const status = [
  {
    value: '',
    label: ''
  },
  {
    value: 'Active',
    label: 'Active'
  },
  {
    value: 'In-Active',
    label: 'In-Active'
  }
];

const StopForm = ({ className, closeModal, flag, data, index, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    stopNo: 0,
    stopName: '',
    latitude: { $numberDecimal: 0.0 },
    longitude: { $numberDecimal: 0.0 },
    status: ''
  });
  // alert(values.stopNo);

  // alert(values.latitude);
  useEffect(() => {
    if (data) {
      setValues({
        stopNo: data.stopNo,
        stopName: data.stopName,
        latitude: data.latitude.$numberDecimal,
        longitude: data.longitude.$numberDecimal,
        status: data.status
      });
    }
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const dispatch = useDispatch();

  const saveHandler = () => {
    if (flag && flag == 'edit') {
      if (
        values.stopNo <= 0 ||
        values.stopName === '' ||
        values.latitude === 0.0 ||
        values.longitude === 0.0 ||
        values.status === ''
      ) {
        alert('Enter all details correctly.');
      } else {
        axios
          .put(`https://livebusapi.herokuapp.com/api/admin/stops/${data._id}`, {
            stopNo: values.stopNo,
            stopName: values.stopName,
            latitude: values.latitude,
            longitude: values.longitude,
            status: values.status
          })
          .then(response => {
            let stop = response.data;
            alert('Stop updated successfully');
            dispatch(editStop(stop, index));
          })
          .catch(err => {
            alert(err);
          });
        closeModal();
      }
    } else {
      if (
        values.stopNo <= 0 ||
        values.stopName === '' ||
        values.latitude === 0.0 ||
        values.longitude === 0.0 ||
        values.status === ''
      ) {
        alert('Enter all details correctly.');
      } else {
        axios
          .post('https://livebusapi.herokuapp.com/api/admin/stops/', {
            stopNo: values.stopNo,
            stopName: values.stopName,
            latitude: values.latitude,
            longitude: values.longitude,
            status: values.status
          })
          .then(response => {
            let stop = response.data;
            alert('Stop added successfully');
            dispatch(addStop(stop));
          })
          .catch(err => {
            alert(err);
          });
        closeModal();
      }
    }
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
                select
                SelectProps={{ native: true }}
                value={values.status}
                variant="outlined"
              >
                {status.map(option => (
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
          <Button
            style={{ marginRight: 10 }}
            color="primary"
            variant="contained"
            onClick={() => saveHandler()}
          >
            Save details
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => closeModal()}
          >
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
