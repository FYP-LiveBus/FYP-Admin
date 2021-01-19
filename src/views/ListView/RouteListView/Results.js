import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  // Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  Select,
  MenuItem
} from '@material-ui/core';
// import MyModal from 'src/components/modal';
import axios from 'axios';
import { deleteRoute } from 'src/Redux/actions';
import { useDispatch } from 'react-redux';
import MyUpdateModal from 'src/components/updateModal';

const useStyles = makeStyles(theme => ({
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
  const dispatch = useDispatch();

  // const handleSelectAll = event => {
  //   let newSelectedRouteIds;

  //   if (event.target.checked) {
  //     newSelectedRouteIds = routes.map(route => route._id);
  //   } else {
  //     newSelectedRouteIds = [];
  //   }

  //   setSelectedRouteIds(newSelectedRouteIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedRouteIds.indexOf(id);
  //   let newSelectedRouteIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedRouteIds = newSelectedRouteIds.concat(selectedRouteIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedRouteIds = newSelectedRouteIds.concat(
  //       selectedRouteIds.slice(1)
  //     );
  //   } else if (selectedIndex === selectedRouteIds.length - 1) {
  //     newSelectedRouteIds = newSelectedRouteIds.concat(
  //       selectedRouteIds.slice(0, -1)
  //     );
  //   } else if (selectedIndex > 0) {
  //     newSelectedRouteIds = newSelectedRouteIds.concat(
  //       selectedRouteIds.slice(0, selectedIndex),
  //       selectedRouteIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedRouteIds(newSelectedRouteIds);
  // };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const handleStopsModal = () => {
  //   MyModal();
  // };

  const handleDelete = id => {
    alert(id);
    axios
      .delete(`https://livebusapi.herokuapp.com/api/admin/routes/${id}/`)
      .then(response => {
        dispatch(deleteRoute(response.data));
        alert('Route deleted successfully');
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox"></TableCell> */}
                <TableCell>Route No</TableCell>
                <TableCell>Route Name</TableCell>
                <TableCell>Starting Stop</TableCell>
                <TableCell>Stops</TableCell>
                <TableCell>Driver</TableCell>
                <TableCell>Bus No</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.slice(0, limit).map((route, index) => (
                <TableRow
                  hover
                  key={route._id}
                  selected={selectedRouteIds.indexOf(route._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRouteIds.indexOf(route._id) !== -1}
                      onChange={event => handleSelectOne(event, route._id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>{route.routeNo}</TableCell>
                  <TableCell>{route.routeName}</TableCell>
                  <TableCell>{route.startingPoint}</TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-mutiple-name-label"
                      id="demo-mutiple-name"
                      multiple={true}
                      value={route.stops}
                      style={{ width: '150px' }}
                    >
                      {route.stops.map(stop => (
                        <MenuItem key={stop} value={stop}>
                          {stop}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.busNo}</TableCell>
                  <TableCell>{route.status}</TableCell>
                  <TableCell>
                    <MyUpdateModal
                      case={'R'}
                      name={'Route'}
                      data={route}
                      index={index}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(route._id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
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
