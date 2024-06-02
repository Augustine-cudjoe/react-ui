import 'bootstrap/dist/css/bootstrap.min.css'

import { FaRegCalendarCheck  } from "react-icons/fa6"; 
import { Container, Row ,Col, Card, ListGroup} from 'react-bootstrap';
import { Search } from './component/Search';
import AddAppointment from './component/AddAppointment';

import AppointmentInfo from './component/AppointmentInfo';
import { useCallback, useEffect, useState } from 'react';

function App() {
let [appointList, setAppointList]=useState([]);
let [query,setQuery]=useState(" ");
let [sortBy,setSortBy]= useState("firstName")
let [orderBy,setOrderBy]= useState("asc")


const filterAppointments=appointList.filter(
  item=>{
    return(
      item.firstName.toLowerCase().includes(query.toLowerCase()) ||
      item.lastName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNote.toLowerCase().includes(query.toLowerCase()) 

    )
  }
).sort((a,b)=>{
  let order=(orderBy==="asc")? 1: -1;
   return(
    a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1*order : order*1
   )
})

const fetchData=useCallback(()=>{
  fetch('./data.json')
  .then(res=>res.json())
  .then(data=>{
    setAppointList(data)
  })
},[])

useEffect(()=>{
  fetchData()

},[fetchData])

  return (
    <div className="App">
      <Container>
        <Row>
        <Col>
          <h1 className='text-center fw-light mt-3'> Appointment <FaRegCalendarCheck /></h1>
           
        </Col>
        </Row>
         <Row className='justify-content-center'>
            <AddAppointment  onSendAppointment={myAppointment=>setAppointList([...appointList,myAppointment])}
            lastId={appointList.reduce((max,item)=>Number(item.id) > max ? Number(item.id):max,0)}/>
         </Row>
         <Row className='justify-content-center'>
          <Col md="4">
            <Search 
              query={query}
               onQueryChange={myQuery=>setQuery(myQuery)}
               orderBy={orderBy}
               onOrderByChange={mySort=>setOrderBy(mySort)}
               sortBy={sortBy} 
               onSortByChange={mysort=>setSortBy(mysort)}
               />
          </Col>
         </Row>
         <Row className='justify-content-center'>
          <Col md="8">
            <Card className='mb-3'>
             <Card.Header>Appointment</Card.Header>
            <ListGroup variant='flush'>
            {
              filterAppointments.map(appointment=>(
             <AppointmentInfo key={appointment.id} appointment={appointment}
             
             onDeleteAppointment= {
              appointmentId=>setAppointList(appointList.filter(
              appointment=>appointment.id !== appointmentId
             ))}
             />
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
