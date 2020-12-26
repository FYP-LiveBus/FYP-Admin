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
  makeStyles,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, subadmins, ...rest }) => {
  const classes = useStyles();
  const [selectedSubAdminIds, setSelectedSubAdminIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedSubAdminIds;

    if (event.target.checked) {
      newSelectedSubAdminIds = subadmins.map((subadmin) => subadmin._id);
    } else {
      newSelectedSubAdminIds = [];
    }

    setSelectedSubAdminIds(newSelectedSubAdminIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSubAdminIds.indexOf(id);
    let newSelectedSubAdminIds = [];

    if (selectedIndex === -1) {
      newSelectedSubAdminIds = newSelectedSubAdminIds.concat(selectedSubAdminIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSubAdminIds = newSelectedSubAdminIds.concat(selectedSubAdminIds.slice(1));
    } else if (selectedIndex === selectedSubAdminIds.length - 1) {
      newSelectedSubAdminIds = newSelectedSubAdminIds.concat(selectedSubAdminIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSubAdminIds = newSelectedSubAdminIds.concat(
        selectedSubAdminIds.slice(0, selectedIndex),
        selectedSubAdminIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSubAdminIds(newSelectedSubAdminIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    alert(id)
    axios.delete(`https://livebusapi.herokuapp.com/api/users/${id}`)
     .then(response => {
       console.log(response.data)
       alert("Sub Admin deleted successfully")
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
                    checked={selectedSubAdminIds.length === subadmins.length}
                    color="primary"
                    indeterminate={
                      selectedSubAdminIds.length > 0
                      && selectedSubAdminIds.length < subadmins.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subadmins.slice(0, limit).map((subadmin) => (
                <TableRow
                  hover
                  key={subadmin._id}
                  selected={selectedSubAdminIds.indexOf(subadmin._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSubAdminIds.indexOf(subadmin._id) !== -1}
                      onChange={(event) => handleSelectOne(event, subadmin._id)}
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
                        src={subadmin.avatarUrl}
                      >
                        {getInitials(subadmin.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${subadmin.firstname} ${subadmin.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {subadmin.username}
                  </TableCell>
                  <TableCell>
                    {subadmin.email}
                  </TableCell>
                  <TableCell>
                    {subadmin.phonenumber}
                  </TableCell>
                  <TableCell>
                    {/* {moment(admin.createdAt).format('DD/MM/YYYY')} */}
                    <Button variant="contained" color="primary">Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>handleDelete(subadmin._id)} variant="contained" color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={subadmins.length}
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
  subadmins: PropTypes.array.isRequired
};

export default Results;
