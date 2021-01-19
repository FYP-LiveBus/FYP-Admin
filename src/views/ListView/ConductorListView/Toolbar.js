import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  // Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import MyModal from 'src/components/modal';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, setSearchConductor, dataConductor, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchConductor(dataConductor);
    } else {
      const res = dataConductor.filter(conductor => {
        if (
          conductor.firstname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return conductor;
        else if (
          conductor.lastname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return conductor;
        else if (
          conductor.username
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return conductor;
      });
      setSearchConductor(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'C'} name={'Conductor'} />
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
                placeholder="Search conductor"
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
