import 'bootstrap/dist/css/bootstrap.min.css'

import { FaRegCalendarCheck  } from "react-icons/fa6"; 
import { Container, Row ,Col, Card, ListGroup,Button,Form } from 'react-bootstrap';
import { Search } from './component/Search';

import axios from 'axios';
import AppointmentInfo from './component/AppointmentInfo';
import { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
function App() {
  const { id } = useParams();
  const clearData ={
    firstName:'' ,
    lastName:'' ,
      aptDate :'' ,
       aptTime:'' ,
       aptNote:''
   };
   
let [appointList, setAppointList]=useState([]);
let [query,setQuery]=useState(" ");
let [sortBy,setSortBy]= useState("firstName")
let [orderBy,setOrderBy]= useState("asc")
let [toggleForm, setToggleForm]=useState(false);
const [edithId,setEditId]=useState(-1)
let  [formData, setFormData]=useState(clearData);
const api=axios.create({
  baseURL:`http://localhost:3000/user`
})
const updateData={
  id:id,
  firstName:'' ,
  lastName:'' ,
    aptDate :'' ,
     aptTime:'' ,
     aptNote:''
 };
 let  [updateformData, setFormDataupdate]=useState(updateData);

const handleEdit=(id)=>{

  api.get(`/${id}`)
  .then(res=>{setFormDataupdate({...updateformData, firstName:res.data.firstName,lastName:res.data.lastName, aptDate:res.data.date,aptTime:res.data.time, aptNote:res.data.aptNote  })})
  setEditId(id)
}

useEffect(()=>{
  
  api.get('/')
 .then(res=>setAppointList(res.data))
 .catch(err=>console.log(err))
  

},[])

const handleSubmit =async() => {
  const newAppointment = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    aptDate: formData.aptDate + ' ' + formData.aptTime,
    aptNote: formData.aptNote
  };

   const res=await  api.post('/', newAppointment )
     console.log(res)
    .catch(error => {
      console.error('Error adding appointment:', error);
    });
};

const handleUpdate=()=>{
            
   
  api.put(`/${edithId}`,{ firstName:updateformData.firstName,lastName:updateformData.lastName,aptDate:updateformData.aptDate + '' + updateformData.aptTime ,aptNote:updateformData.aptNote })
  .then(res=>{
    console.log(res.data);
    setAppointList(res.data)
  })
  .catch(err=>console.log(err))
}

  return (
    <div className="App">
      <Container>
        <Row>
        <Col>
          <h1 className='text-center fw-bold mt-3 '> Book an Appointment <FaRegCalendarCheck /></h1>
           
        </Col>
        </Row>
         <Row className='justify-content-center'>
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
               <Form onSubmit={handleSubmit}>
                   <Row className="mb-3">
                      <Form.Group as={Col}>
                       <Form.Label>First Name</Form.Label>
                       <Form.Control type="text" placeholder="First name" id="firstName"
                       onChange={(event)=>setFormData({...formData, firstName:event.target.value})}
                        />
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
                       <Button variant='primary' type="submit" className='mb-5' >Submit</Button>
               </Form>
            </Card.Body>
            }
        </Col>
         
         </Row>
         <Row className='justify-content-center'>
          <Col md="4">
           
          </Col>
         </Row>
         <Row className='justify-content-center'>
          <Col md="8">
            <Card className='mb-3'>
             <Card.Header>Appointment</Card.Header>
            <ListGroup variant='flush'>
            {
              appointList.map(appointment=>(
               <div key={appointment.id}>
                {
                   appointment.id ==edithId?
                   (<Form  onSubmit={handleUpdate} className='mb-5'>
                    <Row className="mb-3">
                       <Form.Group as={Col}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={updateformData.firstName}
                        onChange={(event)=>setFormDataupdate({...updateformData, firstName:event.target.value})}
                         />
                       </Form.Group>
                       <Form.Group as={Col}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={updateformData.lastName} 
                        onChange={(event)=>setFormDataupdate({...updateformData, lastName:event.target.value})}/>
                       </Form.Group>
                    </Row>
                       <Form.Group as={Col} className="mb-3">
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control type="date" value={updateformData.aptDate}
                        onChange={(event)=>setFormDataupdate({...updateformData, aptDate:event.target.value})}
                        />
                       </Form.Group>
                       <Form.Group as={Col} className="mb-3">
                        <Form.Label>Appointment Time</Form.Label>
                        <Form.Control type="time"  value={updateformData.aptTime} 
                        onChange={(event)=>setFormDataupdate({...updateformData, aptTime:event.target.value})}/>
                       </Form.Group>
                       <Form.Group as={Col} className="mb-3">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control as="textarea"  value={updateformData.aptNote}
                        onChange={(event)=>setFormDataupdate({...updateformData, aptNote:event.target.value})}
                        />
                       </Form.Group>
                        <Button variant='primary' type='submit' className='mb-5' >Update</Button>
                </Form>): ( <AppointmentInfo  appointment={appointment}
                
                     onDeleteAppointment= {
                      appointmentId=>setAppointList(appointList.filter(
                      appointment=>appointment.id !== appointmentId
                     ))}
                     handleEdit={handleEdit}
                     />)
                }
               </div>
                
              ))
            }
            </ListGroup>
            </Card>
          </Col>
         </Row>
        
      </Container>
     
    </div>
  );
}


export default App;
