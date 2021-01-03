import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Checkbox,
  Grid,
  TextField,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Typography,
  TableRow,
} from '@material-ui/core';
import axios from 'axios';
import { addStudent } from 'src/Redux/actions';
import {useDispatch} from 'react-redux'
const useStyles = makeStyles(() => ({
  root: {}
}));

const StudentForm = ({ className, closeModal, ...rest }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  // const [values, setValues] = useState({
  //   firstname: '',
  //   lastname: '',
  //   username: '',
  //   email: '',
  //   phonenumber: '',
  //   password: '',
  //   city: '',
  //   status:''
  // });

  const [pendingStudents, setPendingStudents ] = useState([])
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

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

  // const handleChange = event => {
  //   setValues({
  //     ...values,
  //     [event.target.name]: event.target.value
  //   });
  // };

  useEffect(()=>{
    axios.get(`https://livebusapi.herokuapp.com/api/admin/students/Pending`)
      .then((response)=>{
        setPendingStudents(response.data);
      })
      .catch( err=>alert(err) ) 
  },[])

  const saveHandler = (student) => {
    axios.put(`https://livebusapi.herokuapp.com/api/admin/students/${student._id}`,
    {
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      username: student.username,
      password: student.password,  
      phone: student.phone,
      semester: student.semester,
      registrationNo: student.registrationNo,
      department: student.department,
      status: "Accept"
    })
      .then(response=>{
        let user = response.data
        dispatch(addStudent(user));
        console.log(user)
        alert("Student add successfully");
      })
      .catch(err=>{
        alert("Student did not add successfully")
        console.log(err)
      })
  }

  const deleteHandler = (id) => {
    axios.delete(`https://livebusapi.herokuapp.com/api/admin/students/${id}/`)
      .then( response => alert("Student deleted successfully") )
      .catch( err => alert(err) )
  }

  return (
    <Card>
      {/* <CardHeader title="Students Request" /> */}
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button color="primary" variant="contained" onClick={()=>closeModal()}>
          Close
        </Button>
      </Box>
        <Divider />
      <PerfectScrollbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            </TableCell>
            <TableCell>
              Name
            </TableCell>
            <TableCell>
              Registration No
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
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
          {pendingStudents.slice(0, limit).map((pendingStudent) => (
                <TableRow
                  hover
                  key={pendingStudent._id}
                  selected={selectedStudentIds.indexOf(pendingStudent._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStudentIds.indexOf(pendingStudent._id) !== -1}
                      onChange={(event) => handleSelectOne(event, pendingStudent._id)}
                      pendingStudent="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${pendingStudent.firstname} ${pendingStudent.lastname}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {pendingStudent.registrationNo}
                  </TableCell>
                  <TableCell>
                    {pendingStudent.email}
                  </TableCell>
                  <TableCell>
                    {pendingStudent.department}
                  </TableCell>
                  <TableCell>
                    {pendingStudent.semester}
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>saveHandler(pendingStudent)} variant="contained" color="secondary">Accept</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={()=>deleteHandler(pendingStudent._id)} variant="contained" color="secondary">Decline</Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table> 

      </PerfectScrollbar>
      <Divider />
      <TablePagination
        component="div"
        count={pendingStudents.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>

  );
};

StudentForm.propTypes = {
  className: PropTypes.string
};

export default StudentForm;
