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

const Results = ({ className, students, ...rest }) => {
  const classes = useStyles();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedStudentIds;

    if (event.target.checked) {
      newSelectedStudentIds = students.map((student) => student._id);
    } else {
      newSelectedStudentIds = [];
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedStudentIds.indexOf(id);
    let newSelectedStudentIds = [];

    if (selectedIndex === -1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(selectedStudentIds, id);
    } else if (selectedIndex === 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(selectedStudentIds.slice(1));
    } else if (selectedIndex === selectedStudentIds.length - 1) {
      newSelectedStudentIds = newSelectedStudentIds.concat(selectedStudentIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedStudentIds = newSelectedStudentIds.concat(
        selectedStudentIds.slice(0, selectedIndex),
        selectedStudentIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStudentIds(newSelectedStudentIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    alert(id)
    axios.delete(`https://livebusapi.herokuapp.com/api/admin/students/${id}/`)
     .then(response => {
       alert("Student deleted successfully")
       console.log(response.data)
       
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
        <Box minWidth={1100}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedStudentIds.length === students.length}
                    color="primary"
                    indeterminate={
                      selectedStudentIds.length > 0
                      && selectedStudentIds.length < students.length
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
                  Reg. No
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Department
                </TableCell>
                <TableCell>
                  Semester
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.slice(0, limit).map((student) => (
                <TableRow
                  hover
                  key={student._id}
                  selected={selectedStudentIds.indexOf(student._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStudentIds.indexOf(student._id) !== -1}
                      onChange={(event) => handleSelectOne(event, student._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {/* <Avatar
                        className={classes.avatar}
                        src={student.avatarUrl}
                      > */}
                        {getInitials(student.name)}
                      {/* </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${student.firstname} ${student.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {student.username}
                  </TableCell>
                  <TableCell>
                    {student.registrationNo}
                  </TableCell>
                  <TableCell>
                    {student.email}
                  </TableCell>
                  <TableCell>
                    {student.department}
                  </TableCell>
                  <TableCell>
                    {student.semester}
                  </TableCell>
                  <TableCell>
                    {student.phone}
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>handleDelete(student._id)} variant="contained" color="secondary">Delete</Button>
                  </TableCell>
                  {/* <TableCell>
                    {moment(student.createdAt).format('DD/MM/YYYY')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={students.length}
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
  students: PropTypes.array.isRequired
};

export default Results;
