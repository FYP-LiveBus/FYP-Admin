import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
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
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, trips, ...rest }) => {
  const classes = useStyles();
  const [selectedTripIds, setSelectedTripIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedTripIds;

    if (event.target.checked) {
      newSelectedTripIds = trips.map((trip) => trip._id);
    } else {
      newSelectedTripIds = [];
    }

    setSelectedTripIds(newSelectedTripIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTripIds.indexOf(id);
    let newSelectedTripIds = [];

    if (selectedIndex === -1) {
      newSelectedTripIds = newSelectedTripIds.concat(selectedTripIds, id);
    } else if (selectedIndex === 0) {
      newSelectedTripIds = newSelectedTripIds.concat(selectedTripIds.slice(1));
    } else if (selectedIndex === selectedTripIds.length - 1) {
      newSelectedTripIds = newSelectedTripIds.concat(selectedTripIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedTripIds = newSelectedTripIds.concat(
        selectedTripIds.slice(0, selectedIndex),
        selectedTripIds.slice(selectedIndex + 1)
      );
    }

    setSelectedTripIds(newSelectedTripIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                <TableCell>
                  Driver
                </TableCell>
                <TableCell>
                  Route No
                </TableCell>
                <TableCell>
                  Starting Stop
                </TableCell>
                <TableCell>
                  Ending Stop
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trips.slice(0, limit).map((trip) => (
                <TableRow
                  hover
                  key={trip._id}
                  selected={selectedTripIds.indexOf(trip._id) !== -1}
                >
                  
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {trip.driverName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {trip.routeNo}
                  </TableCell>
                  <TableCell>
                    {trip.startingPoint}
                  </TableCell>
                  <TableCell>
                    {trip.endingPoint}
                  </TableCell>
                  <TableCell>
                    {trip.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={trips.length}
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
  trips: PropTypes.array.isRequired
};

export default Results;
