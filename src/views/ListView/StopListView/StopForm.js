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

const useStyles = makeStyles(() => ({
  root: {}
}));

const StopForm = ({ className, closeModal, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    stopName: '',
    lat: '',
    long: '',
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
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Stop Name"
                name="stopName"
                onChange={handleChange}
                required
                value={values.routeNo}
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
                  value={values.routeNo}
                  variant="outlined"
                />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>    
          <Button color="primary" variant="contained" onClick={()=>closeModal()}>
            Save details
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
