import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { DirectionsCar, DirectionsCarOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.yellow[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.yellow[900]
  },
  differenceValue: {
    color: colors.yellow[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalBuses = ({ count, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Buses
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {JSON.stringify(count)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <DirectionsCar />
              <DirectionsCarOutlined />
            </Avatar>
          </Grid>
        </Grid>
        {/*      
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            16%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      */}
      </CardContent>
    </Card>
  );
};

TotalBuses.propTypes = {
  className: PropTypes.string
};

export default TotalBuses;
