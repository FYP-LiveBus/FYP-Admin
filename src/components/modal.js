import React from 'react';
import Modal from 'react-modal';
import {Button} from '@material-ui/core';
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
  content : {
    top                   : '50%',
    left                  : '60%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-30%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root")
 
export default function MyModal(props){
  const state = useSelector(state => state)
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  let type;

  switch(props.case){
    case 'A':
      type = <AdminForm closeModal={closeModal} />
      break;    

    case 'B':
      type = <BusForm closeModal={closeModal} />
      break;    
            
    case 'C':
      type = <ConductorForm closeModal={closeModal} />
      break;    

    case 'D':
      type = <DriverForm closeModal={closeModal} />
      break;
    
    case 'N':
    type = <NotificationForm closeModal={closeModal} />
    break; 
        
    case 'R':
      type = <RouteForm closeModal={closeModal} />
      break; 
    
    case 'S':
      type = <StopForm closeModal={closeModal} />
      break; 

    case 'SA':
      type = <SubAdminForm closeModal={closeModal} />
      break; 
    
    case 'ST':
      type = <StudentForm closeModal={closeModal} state={state.students}/>
      break;

    default:
        break;
  }
  let res = ''
  if(props.name === 'Notification')
    res = "New" + props.name
  else if( props.name === 'Student')
    res = "Pending " + props.name + "s"
  else
    res = "Add " + props.name

    return (
      <div style={{display: "flex", flexDirection: "column"}}>
         <Button
          color="primary"
          variant="contained"
          onClick={()=>openModal()}
          style={{alignSelf: "flex-end"}}
        >
          { res }
        </Button>
        
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
        {type}
        </Modal>
      </div>
    );
}