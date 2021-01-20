import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
const useStyles = makeStyles(() => ({
  root: {}
}));

const RecentStopHistory = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [yAxis, setYAxis] = useState([]);
  const [xAxis, setXAxis] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://livebusapi.herokuapp.com/api/student/trips/countStopsForGraph`
      )
      .then(response => {
        // alert(JSON.stringify(response.data));
        let da = response.data;
        let arr1 = [];
        let arr2 = [];
        da.map(d => {
          arr1.push(d._id);
          arr2.push(d.count);
        });
        setXAxis(arr1);
        setYAxis(arr2);
      })
      .catch(err => alert(err));
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: yAxis,
        label: 'This week'
      }
      // {
      //   backgroundColor: colors.grey[200],
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: 'Last year'
      // }
    ],
    labels: xAxis
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Button size="small" variant="text">
            Last 7 days
          </Button>
        }
        title="Recent Trips on each stop"
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button> */}
      </Box>
    </Card>
  );
};

RecentStopHistory.propTypes = {
  className: PropTypes.string
};

export default RecentStopHistory;
