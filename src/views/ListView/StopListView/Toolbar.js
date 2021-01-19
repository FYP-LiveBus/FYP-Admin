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

const Toolbar = ({ className, setSearchStop, dataStop, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchStop(dataStop);
    } else {
      const res = dataStop.filter(stop => {
        if (stop.stopNo === event.target.value) return stop;
        else if (
          stop.stopName
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return stop;
        else if (
          stop.status.toLowerCase().indexOf(event.target.value.toLowerCase()) !=
          -1
        )
          return stop;
      });
      setSearchStop(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'S'} name={'Stop'} />
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
                placeholder="Search Stop"
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
