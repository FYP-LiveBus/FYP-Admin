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

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, feedbacks, ...rest }) => {
  const classes = useStyles();
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedFeedbackIds;

    if (event.target.checked) {
      newSelectedFeedbackIds = feedbacks.map(feedback => feedback._id);
    } else {
      newSelectedFeedbackIds = [];
    }

    setSelectedFeedbackIds(newSelectedFeedbackIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFeedbackIds.indexOf(id);
    let newSelectedFeedbackIds = [];

    if (selectedIndex === -1) {
      newSelectedFeedbackIds = newSelectedFeedbackIds.concat(
        selectedFeedbackIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedFeedbackIds = newSelectedFeedbackIds.concat(
        selectedFeedbackIds.slice(1)
      );
    } else if (selectedIndex === selectedFeedbackIds.length - 1) {
      newSelectedFeedbackIds = newSelectedFeedbackIds.concat(
        selectedFeedbackIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedFeedbackIds = newSelectedFeedbackIds.concat(
        selectedFeedbackIds.slice(0, selectedIndex),
        selectedFeedbackIds.slice(selectedIndex + 1)
      );
    }

    setSelectedFeedbackIds(newSelectedFeedbackIds);
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
                <TableCell>Message</TableCell>
                <TableCell>Rating</TableCell>
                {/* <TableCell>
                  Date
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.slice(0, limit).map(feedback => (
                <TableRow
                  hover
                  key={feedback._id}
                  selected={selectedFeedbackIds.indexOf(feedback._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFeedbackIds.indexOf(feedback._id) !== -1}
                      onChange={event => handleSelectOne(event, feedback._id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    {/* <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={feedback.avatarUrl}
                      >
                        {getInitials(feedback.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {feedback.message}
                      </Typography>
                    </Box> */}
                    {feedback.message}
                  </TableCell>
                  <TableCell>{feedback.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={feedbacks.length}
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
  feedbacks: PropTypes.array.isRequired
};

export default Results;
