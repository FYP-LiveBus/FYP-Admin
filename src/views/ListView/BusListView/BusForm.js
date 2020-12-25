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
import axios from "axios"
import {useDispatch} from 'react-redux'
import {addBus} from 'src/Redux/actions'


const states = [
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

const BusForm = ({ className, closeModal, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    busNo: '',
    busModel: '',
    modelYear: '',
    manufacturer: '',
    transmission: '',
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
    axios.post("https://livebusapi.herokuapp.com/api/admin/buses/",
    {
      busNo: values.busNo,
      busModel: values.busModel,
      modelYear: values.modelYear,
      manufacturer: values.manufacturer,
      transmission: values.transmission
    })
      .then(response=>{
        let bus = response.data
        // alert(response.data);
        console.log(response.data)
        dispatch(addBus(bus));
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
                label="Transmission"
                name="transmission"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.transmission}
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
          <Button style={{marginRight: 10}} color="primary" variant="contained" onClick={()=>closeModal()}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={()=>saveHandler()}>
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
