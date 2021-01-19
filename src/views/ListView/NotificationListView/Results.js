import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, notifications, ...rest }) => {
  const classes = useStyles();
  const [selectedNotificationIds, setSelectedNotificationIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedNotificationIds;

    if (event.target.checked) {
      newSelectedNotificationIds = notifications.map(
        notification => notification._id
      );
    } else {
      newSelectedNotificationIds = [];
    }

    setSelectedNotificationIds(newSelectedNotificationIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedNotificationIds.indexOf(id);
    let newSelectedNotificationIds = [];

    if (selectedIndex === -1) {
      newSelectedNotificationIds = newSelectedNotificationIds.concat(
        selectedNotificationIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedNotificationIds = newSelectedNotificationIds.concat(
        selectedNotificationIds.slice(1)
      );
    } else if (selectedIndex === selectedNotificationIds.length - 1) {
      newSelectedNotificationIds = newSelectedNotificationIds.concat(
        selectedNotificationIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedNotificationIds = newSelectedNotificationIds.concat(
        selectedNotificationIds.slice(0, selectedIndex),
        selectedNotificationIds.slice(selectedIndex + 1)
      );
    }

    setSelectedNotificationIds(newSelectedNotificationIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.slice(0, limit).map(notification => (
                <TableRow
                  hover
                  key={notification._id}
                  selected={
                    selectedNotificationIds.indexOf(notification._id) !== -1
                  }
                >
                  <TableCell>{notification.subject}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    {notification.date}
                    {/* {moment(notification.createdAt).format('DD/MM/YYYY')} */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={notifications.length}
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
  notifications: PropTypes.array.isRequired
};

export default Results;
