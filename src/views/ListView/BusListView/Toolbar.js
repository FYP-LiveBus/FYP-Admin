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
  root: {}
}));

const Toolbar = ({ className, setSearchBus, dataBus, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchBus(dataBus);
    } else {
      const res = dataBus.filter(bus => {
        if (
          bus.manufacturer
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return bus;
        else if (
          bus.busNo.toLowerCase().indexOf(event.target.value.toLowerCase()) !=
          -1
        )
          return bus;
        else if (bus.seats <= event.target.value) return bus;
      });
      setSearchBus(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'B'} name={'Bus'} />
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
                placeholder="Search Bus"
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
