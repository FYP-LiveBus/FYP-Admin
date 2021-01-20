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
  makeStyles,
  Select,
  MenuItem,
  Input,
  InputLabel
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addRoute, editRoute } from 'src/Redux/actions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 400
    }
  }
};

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

const RouteForm = ({ className, closeModal, flag, data, index, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    routeNo: 0,
    routeName: '',
    startingPoint: '',
    endingPoint: 'Comsats',
    stops: [],
    selectiveStops: [],
    driversList: [],
    driver: '',
    driverID: '',
    selectedDriver: {},
    status: '',
    buses: [],
    selectedBus: {},
    busNo: ''
  });

  useEffect(() => {
    if (data) {
      axios
        .get(`https://livebusapi.herokuapp.com/api/admin/drivers`)
        .then(response => {
          let driverL = [{}, ...response.data];
          axios
            .get(`https://livebusapi.herokuapp.com/api/admin/stops/Active`)
            .then(response => {
              let st = ['', ...response.data];
              axios
                .get(`https://livebusapi.herokuapp.com/api/admin/buses`)
                .then(response => {
                  let bu = [{}, ...response.data];
                  setValues({
                    ...values,
                    buses: bu,
                    stops: st,
                    driversList: driverL,
                    routeNo: data.routeNo,
                    routeName: data.routeName,
                    selectiveStops: data.stops,
                    status: data.status,
                    busNo: data.busNo,
                    startingPoint: data.startingPoint
                    // driver: data.username,
                    // index: values.driversList.indexOf(data.username),
                    // driver: values.driversList[values.index].username,
                  });
                });
            })
            .catch(err => alert(err));
        })
        .catch(err => alert(err));
    } else if (!data) {
      axios
        .get(`https://livebusapi.herokuapp.com/api/admin/drivers`)
        .then(response => {
          let driverL = [{}, ...response.data];
          axios
            .get(`https://livebusapi.herokuapp.com/api/admin/stops/Active`)
            .then(response => {
              let st = ['', ...response.data];
              axios
                .get(`https://livebusapi.herokuapp.com/api/admin/buses`)
                .then(response => {
                  let bu = [{}, ...response.data];
                  setValues({
                    ...values,
                    buses: bu,
                    stops: st,
                    driversList: driverL
                  });
                });
            })
            .catch(err => alert(err));
        })
        .catch(err => alert(err));
    }
  }, []);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleDriverChange = event => {
    setValues({
      ...values,
      index: event.target.value,
      selectedDriver: values.driversList[index]
    });
  };

  const handleBusChange = event => {
    setValues({
      ...values,
      busNo: event.target.value
      // busIndex: event.target.value
    });
  };

  const handleChangeMultiple = event => {
    setValues({ ...values, selectiveStops: event.target.value });
  };

  const dispatch = useDispatch();

  // console.log(values.driversList[values.index]);
  // console.log(values.buses[values.busIndex]);
  // console.log(' Seleective Stops ==============>' + values.selectiveStops);
  // console.log(values.startingPoint);

  const saveHandler = () => {
    // console.log(values);
    if (
      values.routeNo <= 0 ||
      values.routeName === '' ||
      values.startingPoint === '' ||
      values.stops === [] ||
      values.driversList === [] ||
      values.status === '' ||
      values.buses === []
      // values.busNo === ''
    ) {
      alert('Enter all details correctly');
      // alert(values.routeNo);
      // alert(values.routeName);
      // alert(values.startingPoint);
      // alert(JSON.stringify(values.stops));
      // alert(' Seleective Stops ==============>' + values.selectiveStops);
      // alert(values.status);
      // alert(JSON.stringify(values.driversList[values.index].username));
      // alert(values.driversList[values.index].driverID);
      // alert(values.buses[values.busIndex].busNo);
    } else {
      if (flag && flag == 'edit') {
        axios
          .put(
            `https://livebusapi.herokuapp.com/api/admin/routes/${data._id}`,
            {
              routeNo: values.routeNo,
              routeName: values.routeName,
              startingPoint: values.startingPoint,
              stops: values.selectiveStops,
              status: values.status,
              driver: values.selectedDriver.username,
              driverID: values.selectedDriver.driverID,
              busNo: values.busNo
            }
          )
          .then(response => {
            let route = response.data;
            dispatch(editRoute(route, index));
            alert('Route updated successfully');
          })
          .catch(err => {
            alert(err);
          });
        closeModal();
      } else {
        axios
          .post('https://livebusapi.herokuapp.com/api/admin/routes', {
            routeNo: values.routeNo,
            routeName: values.routeName,
            startingPoint: values.startingPoint,
            stops: values.selectiveStops,
            status: values.status,
            driver: values.driversList[values.index].username,
            driverID: values.driversList[values.index].driverID,
            busNo: values.busNo
          })
          .then(response => {
            let route = response.data;
            dispatch(addRoute(route));
            alert('Route added successfully');
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
      // noValidate
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
                label="Route No"
                name="routeNo"
                onChange={handleChange}
                required
                type="number"
                value={values.routeNo}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Route Name"
                name="routeName"
                onChange={handleChange}
                required
                value={values.routeName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel id="demo-mutiple-name-label">Stops</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={values.selectiveStops}
                name="selectiveStops"
                onChange={handleChangeMultiple}
                input={<Input />}
                MenuProps={MenuProps}
                style={{ width: '400px' }}
              >
                {values.stops.map((stop, i) => (
                  <MenuItem key={i} value={stop.stopName}>
                    {stop.stopName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/* {alert('Data Stops' + JSON.stringify(data.selectiveStops))} */}
            {/* {alert(JSON.stringify(values.selectiveStops))} */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Starting Point"
                name="startingPoint"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.startingPoint}
                variant="outlined"
              >
                {values.selectiveStops.map((selectStop, i) => (
                  <option key={i} value={selectStop}>
                    {selectStop}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Driver"
                name="selectedDriver"
                onChange={handleDriverChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.selectedDriver}
                variant="outlined"
              >
                {values.driversList.map((dr, i) => (
                  <option key={i} value={i}>
                    {dr.firstname ? dr.firstname : ''}
                    {''}
                    {dr.lastname ? dr.lastname : ''}
                    {/* {`${dr.firstname} ${dr.lastname}`} */}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Buses"
                name="busNo"
                onChange={handleBusChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.busNo}
                variant="outlined"
              >
                {values.buses.map((bus, i) => (
                  <option key={i} value={bus.busNo}>
                    {bus.busNo ? bus.busNo : ''}
                  </option>
                ))}
              </TextField>
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
            color="secondary"
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

RouteForm.propTypes = {
  className: PropTypes.string
};

export default RouteForm;
