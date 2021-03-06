import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import MyModal from 'src/components/modal';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

// const handler = () => {
//   <Box mt={3}>
//     <Form />
//   </Box>
// }

const Toolbar = ({ className, setSearchStudent, dataStudent, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchStudent(dataStudent);
    } else {
      const res = dataStudent.filter(student => {
        if (
          student.registrationNo
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return student;
        else if (
          student.firstname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return student;
        else if (student.semester == event.target.value) return student;
      });
      setSearchStudent(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'ST'} name={'Student'} />

      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search student"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
