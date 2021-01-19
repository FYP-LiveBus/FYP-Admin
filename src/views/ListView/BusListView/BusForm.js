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
import { addBus, editBus } from 'src/Redux/actions';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../../firebase';

const transmissionTypes = [
  {
    value: '',
    label: ''
  },
  {
    value: 'auto',
    label: 'Auto'
  },
  {
    value: 'manual',
    label: 'Manual'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const BusForm = ({ className, closeModal, flag, data, index, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    busNo: '',
    busModel: '',
    modelYear: '',
    manufacturer: '',
    seats: 0,
    transmission: ''
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    if (data) {
      setValues(data);
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
    console.log(values);

    if (flag && flag == 'edit') {
      axios
        .put(`https://livebusapi.herokuapp.com/api/admin/buses/${data._id}`, {
          busNo: values.busNo,
          busModel: values.busModel,
          modelYear: values.modelYear,
          manufacturer: values.manufacturer,
          seats: values.seats,
          transmission: values.transmission
        })
        .then(response => {
          let bus = response.data;
          // console.log(response.data);
          dispatch(editBus(bus, index));
          updateInFirebase(bus.busNo, bus.seats);
          alert('Bus Updated successfully');
        })
        .catch(err => {
          alert(err);
        });
    } else {
      axios
        .post('https://livebusapi.herokuapp.com/api/admin/buses/', {
          busNo: values.busNo,
          busModel: values.busModel,
          modelYear: values.modelYear,
          manufacturer: values.manufacturer,
          seats: values.seats,
          transmission: values.transmission
        })
        .then(response => {
          let bus = response.data;
          saveToFirebase();
          dispatch(addBus(bus));
          alert('Bus added successfully');
        })
        .catch(err => {
          alert(err);
        });
    }

    closeModal();
  };

  const saveToFirebase = async () => {
    const s = values.seats;
    const data = {
      // busNo: bus.busNo,
      seats: +s
    };
    const res = await firebase
      .firestore()
      .collection('Bus')
      .doc(values.busNo)
      .set(data);
    console.log(res);
  };

  const updateInFirebase = async (busNo, seats) => {
    let totalSeats = seats;
    const no = await firebase
      .firestore()
      .collection('Bus')
      .doc(busNo)
      .update({ seats: +totalSeats });
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
                label="Bus No"
                name="busNo"
                onChange={handleChange}
                required
                value={values.busNo}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Bus Model"
                name="busModel"
                onChange={handleChange}
                required
                value={values.busModel}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Model Year"
                name="modelYear"
                onChange={handleChange}
                required
                value={values.modelYear}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Maker Company"
                name="manufacturer"
                onChange={handleChange}
                value={values.manufacturer}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Seats"
                name="seats"
                onChange={handleChange}
                value={values.seats}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Transmission"
                name="transmission"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.transmission}
                variant="outlined"
              >
                {transmissionTypes.map(option => (
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

BusForm.propTypes = {
  className: PropTypes.string
};

export default BusForm;
