import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Button,
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
// import getInitials from 'src/utils/getInitials';
import axios from 'axios';
// import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, stops, ...rest }) => {
  const classes = useStyles();
  const [selectedStopIds, setSelectedStopIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedStopIds;

    if (event.target.checked) {
      newSelectedStopIds = stops.map((stop) => stop._id);
    } else {
      newSelectedStopIds = [];
    }

    setSelectedStopIds(newSelectedStopIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStopIds.indexOf(id);
    let newSelectedStopIds = [];

    if (selectedIndex === -1) {
      newSelectedStopIds = newSelectedStopIds.concat(selectedStopIds, id);
    } else if (selectedIndex === 0) {
      newSelectedStopIds = newSelectedStopIds.concat(selectedStopIds.slice(1));
    } else if (selectedIndex === selectedStopIds.length - 1) {
      newSelectedStopIds = newSelectedStopIds.concat(selectedStopIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedStopIds = newSelectedStopIds.concat(
        selectedStopIds.slice(0, selectedIndex),
        selectedStopIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStopIds(newSelectedStopIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const dispatch = useDispatch()

  const handleDelete = (id) => {
    alert(id)
    axios.delete(`https://livebusapi.herokuapp.com/api/admin/stops/${id}/`)
     .then(response => {
       alert("Stop deleted successfully")
       console.log(response.data)
        //  dispatch(deleteDriver(response.data));
       })
     .catch(err => {
      //  alert("In Catch")
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
                    checked={selectedStopIds.length === stops.length}
                    color="primary"
                    indeterminate={
                      selectedStopIds.length > 0
                      && selectedStopIds.length < stops.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>
                  Stop No
                </TableCell>
                <TableCell>
                  Stop Name
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                {/* <TableCell>
                  Created At
                </TableCell> */}
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stops.slice(0, limit).map((stop) => (
                <TableRow
                  hover
                  key={stop._id}
                  selected={selectedStopIds.indexOf(stop._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStopIds.indexOf(stop._id) !== -1}
                      onChange={(event) => handleSelectOne(event, stop._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {stop.stopNo}
                  </TableCell>
                  <TableCell>
                    {stop.stopName}
                  </TableCell>
                  <TableCell>
                    {/* {JSON.stringify(stop.latitude)} */}
                    {`${stop.latitude.$numberDecimal}, ${stop.longitude.$numberDecimal}`}
                  </TableCell>
                  <TableCell>
                    {stop.status}
                  </TableCell>
                  {/* <TableCell>
                    {moment(stop.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                  <TableCell>
                    <Button variant="contained" color="primary">Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>handleDelete(stop._id)} variant="contained" color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={stops.length}
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
  stops: PropTypes.array.isRequired
};

export default Results;
