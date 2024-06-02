import React from 'react'

import {ListGroup,Button} from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const AppointmentInfo = ({appointment,onDeleteAppointment}) => {
  return (
    <>
     <ListGroup.Item>
           <p><small>aptDate: </small> {appointment.aptDate}</p>
           <p><strong>First name:</strong>  {appointment.firstName}</p>
            <p><strong>Last name: </strong> {appointment.lastName}</p>
            <p> <strong>Note: </strong> {appointment.aptNote}</p>
            <Button onClick={()=> onDeleteAppointment(appointment.id)} size="sm" variant="danger"> < MdDelete/> Delete</Button>
       </ListGroup.Item>
    </>
  )
}

export default AppointmentInfo;