import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../../firebase';
import MyUpdateModal from 'src/components/updateModal';
import { deleteBus } from 'src/Redux/actions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, buses, ...rest }) => {
  const classes = useStyles();

  const [selectedBusIds, setSelectedBusIds] = useState([]);

  const [limit, setLimit] = useState(10);

  const [page, setPage] = useState(0);

  // const [sortColumn, setSortColumn] = useState({
  //   path: 'manufacturer',
  //   order: 'asc'
  // });

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  // const handleSelectAll = event => {
  //   let newSelectedBusIds;

  //   if (event.target.checked) {
  //     newSelectedBusIds = buses.map(bus => bus._id);
  //   } else {
  //     newSelectedBusIds = [];
  //   }

  //   setSelectedBusIds(newSelectedBusIds);
  // };

  const dispatch = useDispatch();

  const handleDelete = (id, busNo) => {
    //  alert(id)
    axios
      .delete(`https://livebusapi.herokuapp.com/api/admin/buses/${id}/`)
      .then(response => {
        alert('Bus deleted successfully');
        deleteFromFirebase(busNo);
        console.log(response.data);
        dispatch(deleteBus(response.data));
      })
      .catch(err => {
        alert(err);
      });
  };

  const deleteFromFirebase = async busNo => {
    const res = await firebase
      .firestore()
      .collection('Bus')
      .doc(busNo)
      .delete();
  };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedBusIds.indexOf(id);
  //   let newSelectedBusIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedBusIds = newSelectedBusIds.concat(selectedBusIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedBusIds = newSelectedBusIds.concat(selectedBusIds.slice(1));
  //   } else if (selectedIndex === selectedBusIds.length - 1) {
  //     newSelectedBusIds = newSelectedBusIds.concat(selectedBusIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedBusIds = newSelectedBusIds.concat(
  //       selectedBusIds.slice(0, selectedIndex),
  //       selectedBusIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedBusIds(newSelectedBusIds);
  // };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // const handleSort = sortColumn => {
  //   setSortColumn({ sortColumn });
  // };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={100}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox"></TableCell> */}
                <TableCell>Manufacturer</TableCell>
                <TableCell>Bus Model</TableCell>
                <TableCell>Bus No</TableCell>
                <TableCell>Make Year</TableCell>
                <TableCell>Seats</TableCell>
                <TableCell>Transmission</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buses.slice(0, limit).map((bus, index) => (
                <TableRow
                  hover
                  key={bus._id}
                  selected={selectedBusIds.indexOf(bus._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedBusIds.indexOf(bus._id) !== -1}
                      onChange={event => handleSelectOne(event, bus._id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      {getInitials(bus.name)}
                      <Typography color="textPrimary" variant="body1">
                        {bus.manufacturer}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{bus.busModel}</TableCell>
                  <TableCell>{bus.busNo}</TableCell>
                  <TableCell>{bus.modelYear}</TableCell>
                  <TableCell>{bus.seats}</TableCell>
                  <TableCell>{bus.transmission}</TableCell>
                  <TableCell>
                    <MyUpdateModal
                      case={'B'}
                      name={'Bus'}
                      data={bus}
                      index={index}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(bus._id, bus.busNo)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={buses.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  buses: PropTypes.array.isRequired
};

export default Results;
