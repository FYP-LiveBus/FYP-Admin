import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalStudents = ({ className, ...rest }) => {
  const classes = useStyles();
  const [countStd, setCountStd] = React.useState(0);
  React.useEffect(() => {
    Axios.get(`https://livebusapi.herokuapp.com/api/admin/students/countAll`)
      .then(response => {
        // alert(response.data);
        setCountStd(response.data);
      })
      .catch(error => {
        console.log(error);
        // alert(error);
      });
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              Total Students
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {countStd}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalStudents.propTypes = {
  className: PropTypes.string
};

export default TotalStudents;
