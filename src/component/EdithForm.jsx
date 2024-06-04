import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row ,Col, Card, ListGroup,Button,Form } from 'react-bootstrap';
function EdithForm() {
    const { id } = useParams();
    const updateData={
        id:id,
        firstName:'' ,
        lastName:'' ,
          aptDate :'' ,
           aptTime:'' ,
           aptNote:''
       };
       let  [updateformData, setFormDataupdate]=useState(updateData);
       useEffect(()=>{
        axios.get(`http://localhost:3000/user/${id}`)
        .then(res=>{setFormDataupdate({...updateformData, firstName:res.data.firstName,lastName:res.data.lastName, aptDate:res.data.date,aptTime:res.data.time, aptNote:res.data.aptNote  })})
       
       },[id])
        
        
        
        const handleUpdate=()=>{
            
           
          axios.put(`http://localhost:3000/user/${id}`,{ firstName:updateformData.firstName,lastName:updateformData.lastName,aptDate:updateformData.aptDate + '' + updateformData.aptTime ,aptNote:updateformData.aptNote })
          .then(res=>{
            console.log(res);
          
          })
          .catch(err=>console.log(err))
        }
  return (
    <div>
        <Form  onSubmit={handleUpdate}>
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
        </Form>
    </div>
  )
}

export default EdithForm