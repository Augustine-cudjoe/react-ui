
import React from 'react'
import { Button, Col,Form,Row,Card } from 'react-bootstrap';
import { useState } from 'react';

 const AddAppointment = ({onSendAppointment,lastId}) => {

  const clearData ={
   firstName:'' ,
   lastName:'' ,
     aptDate :'' ,
      aptTime:'' ,
      aptNote:''
  };

let [toggleForm, setToggleForm]=useState(false);
let  [formData, setFormData]=useState(clearData);

 function formDataPublic(){

  const appointmentInfo={

    id:lastId +1,
    firstName:formData.firstName,
    lastName: formData.lastName,
    aptDate: formData.aptDate + '' + formData.aptTime,
    aptNote: formData.aptNote

  }
  onSendAppointment(appointmentInfo);
  setFormData(clearData);
  setToggleForm(!toggleForm)
 }

  return (
    <>
        <Col md="8">
            <Card className="mb-3 mt-3" />
           < Card.Header  className='text-center fw-bold mb-3'> Add Appointment
               <Button 
               size="sm"
               className='small float-end' 
                onClick={()=>{setToggleForm(!toggleForm)}}>+</Button>
           </Card.Header>
           
           
            { toggleForm &&
              
               <Card.Body>
               <Form>
                   <Row className="mb-3">
                      <Form.Group as={Col}>
                       <Form.Label>First Name</Form.Label>
                       <Form.Control type="text" placeholder="First name" id="firstName"
                       onChange={(event)=>setFormData({...formData, firstName:event.target.value})}/>
                      </Form.Group>
                      <Form.Group as={Col}>
                       <Form.Label>Last Name</Form.Label>
                       <Form.Control type="text" placeholder="Last name"  id="lastName"
                       onChange={(event)=>setFormData({...formData, lastName:event.target.value})}/>
                      </Form.Group>
                   </Row>
                      <Form.Group as={Col} className="mb-3">
                       <Form.Label>Appointment Date</Form.Label>
                       <Form.Control type="date" id="aptDate"
                       onChange={(event)=>setFormData({...formData, aptDate:event.target.value})}/>
                      </Form.Group>
                      <Form.Group as={Col} className="mb-3">
                       <Form.Label>Appointment Time</Form.Label>
                       <Form.Control type="time"  id="aptTime"
                       onChange={(event)=>setFormData({...formData, aptTime:event.target.value})} />
                      </Form.Group>
                      <Form.Group as={Col} className="mb-3">
                       <Form.Label>Comments</Form.Label>
                       <Form.Control as="textarea" placeholder="Comments"  id="aptNote"
                       onChange={(event)=>setFormData({...formData, aptNote:event.target.value})}/>
                      </Form.Group>
                       <Button variant='primary' onClick={formDataPublic}>Submit</Button>
               </Form>
            </Card.Body>
            }
        </Col>
    </>
  )
}
export default AddAppointment;