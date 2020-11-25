import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, conductors, ...rest }) => {
  const classes = useStyles();
  const [selectedConductorIds, setSelectedConductorIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedConductorIds;

    if (event.target.checked) {
      newSelectedConductorIds = conductors.map((conductor) => conductor.id);
    } else {
      newSelectedConductorIds = [];
    }

    setSelectedConductorIds(newSelectedConductorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedConductorIds.indexOf(id);
    let newSelectedConductorIds = [];

    if (selectedIndex === -1) {
      newSelectedConductorIds = newSelectedConductorIds.concat(selectedConductorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedConductorIds = newSelectedConductorIds.concat(selectedConductorIds.slice(1));
    } else if (selectedIndex === selectedConductorIds.length - 1) {
      newSelectedConductorIds = newSelectedConductorIds.concat(selectedConductorIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedConductorIds = newSelectedConductorIds.concat(
        selectedConductorIds.slice(0, selectedIndex),
        selectedConductorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedConductorIds(newSelectedConductorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    alert(id)
    axios.delete(`https://livebusapi.herokuapp.com/api/admin/conductors/${id}/`)
     .then(response => {
       alert("Conductor deleted successfully")
       console.log(response.data)
        // dispatch(viewConductor(response.data));
       })
     .catch(err => {
       alert("In Catch")
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
                  <Checkbox
                    checked={selectedConductorIds.length === conductors.length}
                    color="primary"
                    indeterminate={
                      selectedConductorIds.length > 0
                      && selectedConductorIds.length < conductors.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Age
                </TableCell>
                <TableCell>
                  City
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conductors.slice(0, limit).map((conductor) => (
                <TableRow
                  hover
                  key={conductor._id}
                  selected={selectedConductorIds.indexOf(conductor._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedConductorIds.indexOf(conductor._id) !== -1}
                      onChange={(event) => handleSelectOne(event, conductor._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={conductor.avatarUrl}
                      >
                        {getInitials(conductor.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${conductor.firstname} ${conductor.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {conductor.username}
                  </TableCell>
                  <TableCell>
                    {conductor.phone}
                  </TableCell>
                  <TableCell>
                    {conductor.age}
                  </TableCell>
                  <TableCell>
                    {conductor.city}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>handleDelete(conductor._id)} variant="contained" color="secondary">Delete</Button>
                  </TableCell>
                  {/* <TableCell>
                    {moment(conductor.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={conductors.length}
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
  conductors: PropTypes.array.isRequired
};

export default Results;
