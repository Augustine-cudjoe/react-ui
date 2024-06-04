import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import {ListGroup,Button} from "react-bootstrap";
import { MdDelete } from "react-icons/md";

const AppointmentInfo = ({appointment,onDeleteAppointment,handleEdit}) => {
  return (
    <>
     <ListGroup.Item className='mb-3'>
           <p><small>aptDate: </small> {appointment.aptDate}</p>
           <p><strong>First name:</strong>  {appointment.firstName}</p>
            <p><strong>Last name: </strong> {appointment.lastName}</p>
            <p> <strong>Note: </strong> {appointment.aptNote}</p>
            <div className='d-flex flex-row gap-5'>
            <Button onClick={()=> onDeleteAppointment(appointment.id)} size="sm" variant="danger"> < MdDelete/> Delete</Button>
            <Button onClick={()=> handleEdit(appointment.id)} size="sm" variant="primary" > < FaRegEdit/> Edit</Button>
      
            </div>

       </ListGroup.Item>
    </>
  )
}

export default AppointmentInfo;