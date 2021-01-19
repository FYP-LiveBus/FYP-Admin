import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import DriverForm from 'src/views/ListView/DriverListView/DriverForm';
import ConductorForm from 'src/views/ListView/ConductorListView/ConductorForm';
import SubAdminForm from 'src/views/ListView/SubAdminListView/SubAdminForm';
import AdminForm from 'src/views/ListView/AdminListView/AdminForm';
import RouteForm from 'src/views/ListView/RouteListView/RouteForm';
import BusForm from 'src/views/ListView/BusListView/BusForm';
import StopForm from 'src/views/ListView/StopListView/StopForm';
import NotificationForm from 'src/views/ListView/NotificationListView/NotificationForm';
import StudentForm from 'src/views/ListView/StudentListView/StudentForm';
import { useSelector } from 'react-redux';

const customStyles = {
  content: {
    top: '50%',
    left: '60%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-30%',
    transform: 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function MyUpdateModal(props) {
  const state = useSelector(state => state);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  let type;

  switch (props.case) {
    case 'A':
      type = (
        <AdminForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.admins}
          index={props.index}
        />
      );
      break;

    case 'B':
      type = (
        <BusForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.bus}
          index={props.index}
        />
      );
      break;

    case 'C':
      type = (
        <ConductorForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.conductors}
          index={props.index}
        />
      );
      break;

    case 'D':
      type = (
        <DriverForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.drivers}
          index={props.index}
        />
      );
      break;

    case 'N':
      type = <NotificationForm closeModal={closeModal} />;
      break;

    case 'R':
      type = (
        <RouteForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.routes}
          index={props.index}
        />
      );
      break;

    case 'S':
      type = (
        <StopForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.stops}
          index={props.index}
        />
      );
      break;

    case 'SA':
      type = (
        <SubAdminForm
          closeModal={closeModal}
          flag={'edit'}
          data={props.data}
          state={state.subadmins}
          index={props.index}
        />
      );
      break;

    case 'ST':
      type = <StudentForm closeModal={closeModal} state={state.students} />;
      break;

    default:
      break;
  }
  let res = 'Edit';

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => openModal()}
        style={{ alignSelf: 'center' }}
      >
        {res}
      </Button>

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Update Modal"
      >
        {type}
      </Modal>
    </div>
  );
}
