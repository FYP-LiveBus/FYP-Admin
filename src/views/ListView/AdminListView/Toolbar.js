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

const Toolbar = ({ className, setSearchAdmin, dataAdmin, ...rest }) => {
  const classes = useStyles();

  const handleSearch = event => {
    if (event.target.value == '') {
      setSearchAdmin(dataAdmin);
    } else {
      const res = dataAdmin.filter(admin => {
        if (
          admin.firstname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return admin;
        else if (
          admin.lastname
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return admin;
        else if (
          admin.username
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) != -1
        )
          return admin;
      });
      setSearchAdmin(res);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <MyModal case={'A'} name={'Admin'} />
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
                placeholder="Search admin"
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
