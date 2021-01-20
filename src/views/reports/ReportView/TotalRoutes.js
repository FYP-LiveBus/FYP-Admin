import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  // LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import Axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TotalRoutes = ({ className, ...rest }) => {
  const classes = useStyles();
  const [countRoutes, setCountRoutes] = React.useState(0);

  React.useEffect(() => {
    Axios.get(`https://livebusapi.herokuapp.com/api/admin/routes/totalCount`)
      .then(response => {
        setCountRoutes(response.data);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Routes
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {countRoutes}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalRoutes.propTypes = {
  className: PropTypes.string
};

export default TotalRoutes;
