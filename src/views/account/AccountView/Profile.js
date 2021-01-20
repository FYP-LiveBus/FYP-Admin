import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  // Button,
  Card,
  // CardActions,
  CardContent,
  // Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const userDetails = {
  avatar: '/static/images/avatars/adminLogo.png',
  timezone: 'GTM-5'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ user, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={userDetails.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {`${user.firstname} ${user.lastname}`}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${user.city}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${userDetails.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      {/* <Divider /> */}
      {/* <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
