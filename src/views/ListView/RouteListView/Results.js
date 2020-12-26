import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Select,
  MenuItem
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import MyModal from 'src/components/modal';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, routes, ...rest }) => {
  const classes = useStyles();
  const [selectedRouteIds, setSelectedRouteIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedRouteIds;

    if (event.target.checked) {
      newSelectedRouteIds = routes.map((route) => route._id);
    } else {
      newSelectedRouteIds = [];
    }

    setSelectedRouteIds(newSelectedRouteIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedRouteIds.indexOf(id);
    let newSelectedRouteIds = [];

    if (selectedIndex === -1) {
      newSelectedRouteIds = newSelectedRouteIds.concat(selectedRouteIds, id);
    } else if (selectedIndex === 0) {
      newSelectedRouteIds = newSelectedRouteIds.concat(selectedRouteIds.slice(1));
    } else if (selectedIndex === selectedRouteIds.length - 1) {
      newSelectedRouteIds = newSelectedRouteIds.concat(selectedRouteIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRouteIds = newSelectedRouteIds.concat(
        selectedRouteIds.slice(0, selectedIndex),
        selectedRouteIds.slice(selectedIndex + 1)
      );
    }

    setSelectedRouteIds(newSelectedRouteIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleStopsModal = () => {
    MyModal()
  }

  const handleDelete = (id) => {
     alert(id)
     axios.delete(`https://livebusapi.herokuapp.com/api/admin/routes/${id}/`)
      .then(response => {
        alert("Route deleted successfully")
        console.log(response.data)
        // dispatch(deleteBus(response.data));
      })
      .catch(err => {
        alert(err)
      });
    }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedRouteIds.length === routes.length}
                    color="primary"
                    indeterminate={
                      selectedRouteIds.length > 0
                      && selectedRouteIds.length < routes.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>
                  Route No
                </TableCell>
                <TableCell>
                  Route Name
                </TableCell>
                <TableCell onClick={handleStopsModal}>
                  Starting Point
                </TableCell>
                <TableCell>
                  Stops
                </TableCell>
                <TableCell >
                  Driver
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.slice(0, limit).map((route) => (
                <TableRow
                  hover
                  key={route._id}
                  selected={selectedRouteIds.indexOf(route._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRouteIds.indexOf(route._id) !== -1}
                      onChange={(event) => handleSelectOne(event, route._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {route.routeNo}
                  </TableCell>
                  <TableCell>
                    {route.routeName}
                  </TableCell>
                  <TableCell>
                    {route.startingPoint}
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple={true}
                      value={route.stops}
                      // onChange={handleChangeMultiple}
                      // input={<Input />}
                      // MenuProps={MenuProps}
                      style={{width:"150px"}}
                    >
                      {route.stops.map((stop) => (
                        <MenuItem key={stop} value={stop} >
                          {stop}
                        </MenuItem>
                        ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    {route.driver}
                    {/* <div>Anwar Saleem</div> */}
                  </TableCell>
                  <TableCell>
                    {route.status}
                    {/* {moment(route.createdAt).format('DD/MM/YYYY')} */}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>handleDelete(route._id)} variant="contained" color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={routes.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  routes: PropTypes.array.isRequired
};

export default Results;
