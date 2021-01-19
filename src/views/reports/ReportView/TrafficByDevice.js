import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [count, setCount] = React.useState({ totalAccept: 0, totalPending: 0 });
  useEffect(() => {
    axios
      .get(`https://livebusapi.herokuapp.com/api/admin/students/count`)
      .then(response => {
        setCount(response.data);
        // dispatch(countStudents(response.data));
        // alert(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const func = () => {
    const data = {
      datasets: [
        {
          data: [count.totalAccept, count.totalPending],
          backgroundColor: [
            colors.indigo[500],
            colors.red[600]
            // colors.orange[600]
          ],
          borderWidth: 8,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: ['Accept', 'Pending']
    };
    return data;
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Accept',
      value: count.totalAccept,
      // icon: LaptopMacIcon,
      color: colors.indigo[500]
    },
    // {
    //   title: 'Tablet',
    //   value: 15,
    //   icon: TabletIcon,
    //   color: colors.red[600]
    // },
    {
      title: 'Pending',
      value: count.totalPending,
      // icon: PhoneIcon,
      color: colors.orange[600]
    }
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Students Request" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={func} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string
};

export default TrafficByDevice;
