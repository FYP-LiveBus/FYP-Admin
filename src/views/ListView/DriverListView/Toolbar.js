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

const Toolbar = ({ className, setSearchDriver, dataDriver, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchDriver(dataDriver);
    } else {
      const res = dataDriver.filter(driver => {
        if (
          driver.firstname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return driver;
        else if (
          driver.lastname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return driver;
        else if (
          driver.username
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return driver;
      });
      setSearchDriver(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'D'} name={'Driver'} />
      <Box display="flex" justifyContent="flex-end"></Box>
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
                placeholder="Search driver"
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
