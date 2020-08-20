import React from "react";
import { Card, Button, Col, Image, Alert, Badge, Row } from "react-bootstrap";

export const Vehicle = props => {
  let vehicles = {
	  veh1 : { 
		make: 'Lamborghini',
	    model: 'Gallardo',
	    vehicle_type: 'coupe',
	    year: '2010',
	    last_serviced: '2020-01-20',
	    condition: 'used',
		rental_location: '1314 The Alameda, San Jose, CA, USA',
      }
  };

  const list = Object.keys(vehicles).map(key => (
    <Card
      bg="light"
      style={{ width: "45rem", paddingRight: "100px" }}
      className="mt-2"
    >
		<Card.Body>
		<Row>
			<Col xs={6} md={4}>
				<Image src="http://localhost:3000/images/Lamborghini.jpg"xs={6} md={4} rounded className="w-100"/>
			</Col>
			<Col xs={6} md={4}>
				{/* {vehicles[key].make} */}
				<Card.Text id="type">{vehicles[key].make}</Card.Text>
				<Card.Text id="type">{vehicles[key].model}</Card.Text>
				<Card.Text id="type">{vehicles[key].vehicle_type}</Card.Text>
				<Card.Text id="type">{vehicles[key].year}</Card.Text>
			</Col>
			<Col>
				<Card.Text id="type">{vehicles[key].last_serviced}</Card.Text>
				<Card.Text id="type">{vehicles[key].condition}</Card.Text>
				<Card.Text id="type">{vehicles[key].rental_location}</Card.Text>
			</Col>
			
		</Row>
		<Button variant="primary">Reserve</Button>
		
      
		  
        
      </Card.Body>
    </Card>
  ));
  return (
    <div style={{ paddingLeft: "300px" }}>
      {list}
    </div>
  );
};
