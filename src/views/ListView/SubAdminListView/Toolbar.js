import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
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

const Toolbar = ({ className, setSearchSubAdmin, dataSubAdmin, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchSubAdmin(dataSubAdmin);
    } else {
      const res = dataSubAdmin.filter(subAdmin => {
        if (
          subAdmin.firstname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return subAdmin;
        else if (
          subAdmin.lastname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return subAdmin;
        else if (
          subAdmin.username
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return subAdmin;
      });
      setSearchSubAdmin(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'SA'} name={'SubAdmin'} />
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
                placeholder="Search sub admin"
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
