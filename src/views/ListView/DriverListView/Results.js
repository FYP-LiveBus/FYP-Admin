import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
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
  Button
} from '@material-ui/core';
import MyUpdateModal from 'src/components/updateModal';
import axios from 'axios';
import { deleteDriver } from 'src/Redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, drivers, ...rest }) => {
  const classes = useStyles();
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  // const handleSelectAll = event => {
  //   let newSelectedDriverIds;

  //   if (event.target.checked) {
  //     newSelectedDriverIds = drivers.map(driver => driver._id);
  //   } else {
  //     newSelectedDriverIds = [];
  //   }

  //   setSelectedDriverIds(newSelectedDriverIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedDriverIds.indexOf(id);
  //   let newSelectedDriverIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedDriverIds = newSelectedDriverIds.concat(
  //       selectedDriverIds.slice(1)
  //     );
  //   } else if (selectedIndex === selectedDriverIds.length - 1) {
  //     newSelectedDriverIds = newSelectedDriverIds.concat(
  //       selectedDriverIds.slice(0, -1)
  //     );
  //   } else if (selectedIndex > 0) {
  //     newSelectedDriverIds = newSelectedDriverIds.concat(
  //       selectedDriverIds.slice(0, selectedIndex),
  //       selectedDriverIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedDriverIds(newSelectedDriverIds);
  // };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();

  const handleDelete = id => {
    // alert(id);
    axios
      .delete(`https://livebusapi.herokuapp.com/api/admin/drivers/${id}/`)
      .then(response => {
        alert('Driver deleted successfully');
        // console.log(response.data);
        dispatch(deleteDriver(response.data));
      })
      .catch(err => {
        alert('In Catch');
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
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>License Number</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>City</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.slice(0, limit).map((driver, index) => (
                <TableRow
                  hover
                  key={driver._id}
                  selected={selectedDriverIds.indexOf(driver._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedDriverIds.indexOf(driver._id) !== -1}
                      onChange={event => handleSelectOne(event, driver._id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {`${driver.firstname} ${driver.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{driver.username}</TableCell>
                  <TableCell>{driver.licensenumber}</TableCell>
                  <TableCell>{driver.phone}</TableCell>
                  <TableCell>{driver.age}</TableCell>
                  <TableCell>{driver.city}</TableCell>
                  <TableCell>
                    <MyUpdateModal
                      case={'D'}
                      name={'Driver'}
                      data={driver}
                      index={index}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(driver._id)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                  {/* <TableCell>
                    {moment(customer.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={drivers.length}
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
  drivers: PropTypes.array.isRequired
};

export default Results;
