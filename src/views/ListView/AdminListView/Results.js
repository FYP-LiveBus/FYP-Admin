import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  // Checkbox,
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
// import getInitials from 'src/utils/getInitials';
import axios from 'axios';
import MyUpdateModal from 'src/components/updateModal';
import { deleteAdmin } from 'src/Redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, admins, ...rest }) => {
  const classes = useStyles();
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  // const handleSelectAll = event => {
  //   let newSelectedAdminIds;

  //   if (event.target.checked) {
  //     newSelectedAdminIds = admins.map(admin => admin._id);
  //   } else {
  //     newSelectedAdminIds = [];
  //   }

  //   setSelectedAdminIds(newSelectedAdminIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedAdminIds.indexOf(id);
  //   let newSelectedAdminIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(
  //       selectedAdminIds.slice(1)
  //     );
  //   } else if (selectedIndex === selectedAdminIds.length - 1) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(
  //       selectedAdminIds.slice(0, -1)
  //     );
  //   } else if (selectedIndex > 0) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(
  //       selectedAdminIds.slice(0, selectedIndex),
  //       selectedAdminIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedAdminIds(newSelectedAdminIds);
  // };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = id => {
    alert(id);
    axios
      .delete(`https://livebusapi.herokuapp.com/api/users/${id}/`)
      .then(response => {
        alert('Admin deleted successfully');
        // console.log(response.data);
        dispatch(deleteAdmin(response.data));
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
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.slice(0, limit).map((admin, index) => (
                <TableRow
                  hover
                  key={admin._id}
                  selected={selectedAdminIds.indexOf(admin._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedAdminIds.indexOf(admin._id) !== -1}
                      onChange={event => handleSelectOne(event, admin._id)}
                      value="true"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      {/* <Avatar
                        className={classes.avatar}
                        src={admin.avatarUrl}
                      >
                        {getInitials(admin.name)}
                      </Avatar> */}
                      <Typography color="textPrimary" variant="body1">
                        {`${admin.firstname} ${admin.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phonenumber}</TableCell>
                  <TableCell>
                    {/* {moment(admin.createdAt).format('DD/MM/YYYY')} */}
                    <MyUpdateModal
                      case={'A'}
                      name={'Admin'}
                      data={admin}
                      index={index}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(admin._id)}
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
        count={admins.length}
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
  admins: PropTypes.array.isRequired
};

export default Results;
