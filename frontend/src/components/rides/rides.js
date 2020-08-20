import React, { Component } from "react";
import {rooturl} from '../../config';
import axios from 'axios';
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import { Card, Button, Col, Image, Alert, Form, Row, Modal } from "react-bootstrap";

class Rides extends Component {
	constructor() {
		super();

		this.state = {
			reservations: [],
			pastreservations: [],
			upcomingreservations: [],
			currentreservations: [],
			selectedreservation: null,
			showEndRide: false,
			showCancelRide: false,
			selectedreservationcancel: null,
			minutes: null,
			seconds: null,
			showTimer: false,
			showFeedback: false,
			user_email: "",
			vehicle_id: "",
			comments: "",
			service_satisfaction: "",
			car_satisfaction: "",
			reservation_id: "",
			latefee: null,
		}
	}
	

	componentDidMount() {
		this.getReservations();
		this.pastReservations();
		this.currentReservations();
		this.getCurrentReservationStatus();
		this.myInterval();
		this.getUserId();
	}
	
	  getUserId = () => {
		this.setState({ user_email: localStorage.getItem("email") });
	  };

	componentWillUnmount() {
        clearInterval(this.myInterval);
    }
	getCurrentReservationStatus = () => {
		let params = new URLSearchParams();
		params.set('email', localStorage.getItem("email"));
        axios.get(rooturl  + "/getcurrentreservationstaus?"+params.toString())
        .then(res => {
            if(res.status === 200){
                if(res.data && res.data.length > 0){
					this.setState({
						showTimer: true,
						minutes: res.data[0],
						seconds: res.data[1],
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}

	submitHandler = (event) => {
		event.preventDefault();
		console.log(this.state);
		const data = {
			user_email: this.state.user_email,
			vehicle_id: this.state.vehicle_id,
			comments: this.state.comments,
			service_satisfaction: this.state.service_satisfaction,
			car_satisfaction: this.state.car_satisfaction,
			reservation_id: this.state.reservation_id,
		}
		console.log("FORM 11!");
		axios
		  .post(rooturl + "/feedback", data)
		  .then((res) => {
			if (res.status == 200) {
			  console.log(res.data);
			  this.setState({
				  showFeedback: false,
				  selectedreservation: null,
			  })
			}
		  })
		  .catch((err) => {});
	  };


	myInterval = () => {
		setInterval(() => {
			const { seconds, minutes } = this.state
			if (seconds > 0) {
			  this.setState(({ seconds }) => ({
				seconds: seconds - 1
			  }))
			}
			if (seconds === 0) {
			  if (minutes === 0) {
				clearInterval(this.myInterval)
			  } else {
				this.setState(({ minutes }) => ({
				  minutes: minutes - 1,
				  seconds: 59
				}))
			  }
			}
		  }, 1000)
	}


	currentReservations = () => {
		let params = new URLSearchParams();
		params.set('email', localStorage.getItem("email"));
        axios.get(rooturl  + "/currentreservations?"+params.toString())
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.setState({
						currentreservations: res.data
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	}

	getReservations = () => {
		let params = new URLSearchParams();
		params.set('email', localStorage.getItem("email"));
        axios.get(rooturl  + "/allreservations?"+params.toString())
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.setState({
						reservations: res.data
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	} 

	pastReservations = () => {
		let params = new URLSearchParams();
		params.set('email', localStorage.getItem("email"));
        axios.get(rooturl  + "/pastreservations?"+params.toString())
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.setState({
						pastreservations: res.data
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
	} 

	gotoMainPage = () => {
		this.props.history.push('/profile');
	}

	endRideToBackend = (reservation) => {

		const data = {
			id : reservation.id,
			amount : Number(reservation.amount) + (this.state.latefee != null ? Number(this.state.latefee) : 0),
		}
		axios.post(rooturl + '/endreservation', data)
		.then(response => {
			console.log("Response Status: " + response.status);
					if(response.status === 200){
						this.setState({
							showEndRide: false,
							showTimer: false,
							showFeedback: true,
							vehicle_id: reservation.vehicle_id,
							reservation_id: reservation.id,
						})
					}
				})
		.catch(err => {
		})

	}

	cancelRideToBackend = (reservation) => {

		const data = {
			id : reservation.id,
		}
		axios.post(rooturl + '/cancelreservation', data)
		.then(response => {
			console.log("Response Status: " + response.status);
					if(response.status === 200){	
						this.setState({
							selectedreservationcancel: null,
							showCancelRide: false,
						})
						if(response.data[1] === '0')
						alert(
							"No cancellation fees applied"
						  );
						else {
							alert("Applied cancellation fees of amount $"+ response.data[1]);
						} 
					}
				})
		.catch(err => {
		})

	}

	endRide = (action, reservation) => {
		
		this.setState({
			showEndRide: action,
			selectedreservation: reservation,
		})
	}

	startRide = (action, reservation) => {
		

		const data = {
			id : reservation.id,
		}
		axios.post(rooturl + '/startreservation', data)
		.then(response => {
			console.log("Response Status: " + response.status);
					if(response.status === 200){
						this.setState({
							showTimer: action,
							minutes: response.data[0],
							seconds: response.data[1],
						})
					}
				})
		.catch(err => {
		})
	}

	cancelRide = (action, reservation) => {
		
		this.setState({
			showCancelRide: action,
			selectedreservationcancel: reservation,
		})
	}

	hideEndRide = () => {
		this.setState({
			showEndRide: false,
			selectedreservation: null 
		})
	}

	hideCancelRide = () => {
		this.setState({
			
			selectedreservationcancel: null,
			showCancelRide: false,
		})
	}

	// getLateFee = () => {

    //     axios.get(rooturl  + "/membership")
    //     .then(res => {
    //         if(res.status === 200){
    //             if(res.data){
	// 				this.setState({
	// 					latefee: res.data[2].price
	// 				})
    //             }
    //         }
    //     })
    //     .catch(err=>{
    //         //this.props.setError(err.response.data);
    //     })

	// }
	render(){

		const { minutes, seconds } = this.state;

		if(minutes && seconds && minutes <= 0 && seconds <= 0){
			axios.get(rooturl  + "/membership")
        .then(res => {
            if(res.status === 200){
                if(res.data){
					this.setState({
						latefee: res.data[2].price
					})
                }
            }
        })
        .catch(err=>{
            //this.props.setError(err.response.data);
        })
		}

		let timer;
		if(this.state.showTimer) {
		
		timer = (
			<div>
                { minutes <= 0 && seconds <= 0
                    ? (<h1>You have exceeded your ride time! Late fees may apply</h1>)
                    : <h1>Time Remaining (mm:ss): {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                }
            </div>
		  );
		}

		let endRideModal;
		if(this.state.selectedreservation) {
			endRideModal = (
				<Modal show={true} onHide={false} animation={false}>
					<Modal.Header closeButton>
            			<Modal.Title>End reservation</Modal.Title>
          			</Modal.Header>
					<Modal.Body>
					<Row>
						<Col>Reservation Number: {this.state.selectedreservation.id}</Col>	
					</Row>
						<Row>
							<Col id="start_time"><b>Ride Start Time: </b>{this.state.selectedreservation.start_time} </Col>
							
						</Row>
						<Row>
							<Col id="end_time"><b>Ride End Time: </b> {this.state.selectedreservation.end_time} </Col>
						</Row>
						<Row>
							<Col id="msg">Hope you had a great Trip. See you next time! </Col>
						</Row>
						<Row>
							<Col>Amount charged: ${this.state.selectedreservation.amount} 
							{this.state.latefee && `+ $${this.state.latefee} late fees` }</Col>	
						</Row>
						<Row>
							<Button className="ml-5" variant="success" onClick={() => this.endRideToBackend(this.state.selectedreservation)}>Confirm</Button>
							{/* <Button variant="warning" onClick={() => this.hideEndRide(false)}>Cancel</Button> */}
						</Row>
						<Modal.Footer>
							<Button variant="warning" onClick={() => this.hideEndRide(false)}>Cancel</Button>
          				</Modal.Footer>
					</Modal.Body>
					</Modal>
			);
		}

		let feedbackModal;
		if(this.state.showFeedback) {
			feedbackModal= (
				<Modal show={true} onHide={false} animation={false}>
					<Modal.Header>
            			<Modal.Title>Feedback</Modal.Title>
          			</Modal.Header>
					<Modal.Body>
					<Form onSubmit={this.submitHandler}>
          <Form.Group controlId="formBasicComments">
            <Form.Label>How was the service?</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Enter comments"
              onChange={(event) =>
                this.setState({ comments: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicServiceStar">
            <Form.Label>Service Satifaction</Form.Label>
            <Rating
              name="serviceSatisfaction"
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={this.state.service_satisfaction}
              onChange={(event) =>
                this.setState({ service_satisfaction: event })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicCarStar">
            <Form.Label>Car Satisfaction </Form.Label>
            <Rating
              name="CarSatisfaction"
              emptySymbol={<img src={starempty} className="icon" />}
              fullSymbol={<img src={starfull} className="icon" />}
              initialRating={this.state.car_satisfaction}
              onChange={(event) => this.setState({ car_satisfaction: event })}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
					</Modal.Body>
				</Modal>
			);
		};
		let cancelRideModal;
		if(this.state.selectedreservationcancel) {
			cancelRideModal = (
				<Modal show={true} onHide={false} animation={false}>
					<Modal.Header closeButton>
            			<Modal.Title>Cancel reservation</Modal.Title>
          			</Modal.Header>
					<Modal.Body>
						<Row>
							<Col>Reservation Number: {this.state.selectedreservationcancel.id}
							</Col></Row>
						<Row>
							<Col id="start_time"><b>Ride Start Time: </b>{this.state.selectedreservationcancel.start_time} </Col>
							
						</Row>
						<Row>
							<Col id="end_time"><b>Ride End Time: </b>{this.state.selectedreservationcancel.end_time} </Col>
						</Row>
						<Row>
							<Col id="msg">Hope everything is fine. Why cancel this trip! </Col>
						</Row>
						<Row>
							<Button className="mr-5" variant="success" onClick={() => this.cancelRideToBackend(this.state.selectedreservationcancel)}>Confirm</Button>
							<Button variant="warning" onClick={() => this.hideCancelRide(false)}>Cancel</Button>
						</Row>
					</Modal.Body>
				</Modal>
			);
		}
		

		let pastRidesH;

		pastRidesH = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Completed trips</h2>
		);
		let past;
		if(this.state.pastreservations.length > 0) {
			past = Object.keys(this.state.pastreservations).map(key => (
				<Col >
				<Card
				bg="light"
				style={{ width: "30rem", paddingRight: "100px" }}
				className="mt-2"
				>
				<Card.Body>
					<Card.Header>Reservation Number: {this.state.pastreservations[key].id}</Card.Header>
					<Row>
						<Col id="start_time">Ride Time:{this.state.pastreservations[key].start_time} </Col>
						
					</Row>
					<Row>
						<Col id="end_time">To {this.state.pastreservations[key].end_time} </Col>
					</Row>
					
				</Card.Body>
				</Card>
				</Col>
	  		));
		} else {
			past = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>No Past trips</h2>
			);
		}
		
		let upcomingRidesH;

		upcomingRidesH = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Upcoming Trips</h2>
		);
		let upcoming;
		if(this.state.reservations.length > 0) {
			upcoming = Object.keys(this.state.reservations).map(key => (
				<Col >
				<Card
				bg="light"
				style={{ width: "30rem", paddingRight: "100px" }}
				className="mt-2"
				>
				<Card.Body>
					<Card.Header>Reservation Number: {this.state.reservations[key].id}</Card.Header>
					<Row>
						<Col id="start_time">Ride Time:{this.state.reservations[key].start_time} </Col>
						
					</Row>
					<Row>
						<Col id="end_time">To {this.state.reservations[key].end_time} </Col>
					</Row>
					<Row>
					{/* <Button variant="success" onClick={() => this.endRide(true, this.state.reservations[key])}>End Ride</Button> */}
					<Button variant="warning" onClick={() => this.cancelRide(true, this.state.reservations[key])}>Cancel Ride</Button>
					</Row>
					
				</Card.Body>
				</Card>
				</Col>
	  		));
		} else {
			upcoming = (
				<div style={{textAlign: "center"}} >
					<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>No upcoming trips</h2>
					<Button variant="success" onClick={() => this.gotoMainPage()}>Book a trip</Button>
				</div>
			);
		}

		let currentRidesH;

		currentRidesH = (
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Current Trips</h2>
		);
		let list;
		if(this.state.currentreservations.length > 0) {
  		list = 
			Object.keys(this.state.currentreservations).map(key => (
			<Col >
			<Card
			bg="light"
			style={{ width: "30rem", paddingRight: "100px" }}
			className="mt-2"
			>
			<Card.Body>
				<Card.Header>Reservation Number: {this.state.currentreservations[key].id}</Card.Header>
				<Row>
					<Col id="start_time">Ride Time:{this.state.currentreservations[key].start_time} </Col>
					
				</Row>
				<Row>
					<Col id="end_time">To {this.state.currentreservations[key].end_time} </Col>
				</Row>
				<Row>
				{!this.state.showTimer &&<Button variant="success" onClick={() => this.startRide(true, this.state.currentreservations[key])}>Start Ride</Button>}
					<Button variant="warning" onClick={() => this.endRide(true, this.state.currentreservations[key])}>End Ride</Button>
				</Row>
				
			</Card.Body>
			</Card>
			</Col>
  ));} else {
	list = (
		<div style={{textAlign: "center"}} >
			<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>No ongoing trips</h2>
		</div>
	);
}

		return(
			<div>
				<h2 style={{color: "Gray", fontWeight: "500", textAlign: "center"}}>Your Trips</h2>
				<hr class="mt-2 mb-3"/>
				{currentRidesH}
				<Row>
					<Col> {timer}</Col>
				</Row>
				 <Row>
				  <Col md={4}>{list}</Col>
				  <Col md={8}> {endRideModal}</Col>
				  <Col md={8}> {feedbackModal}</Col>
				  
			  </Row>
				<hr class="mt-2 mb-3"/>
			   {upcomingRidesH}
			   <Row>
				  <Col md={4}>{upcoming}</Col>
				  <Col md={8}> {cancelRideModal}</Col>
			  </Row>
			  <hr class="mt-2 mb-3"/>
			  {/* <Row>
				  <Col md={4}>{list}</Col>
				  <Col md={8}> {cancelRideModal}{endRideModal}</Col>
				  
			  </Row> */}
			  <hr class="mt-2 mb-3"/>
			  {pastRidesH}
			  <Row>
				  <Col md={4}>{past}</Col>
			  </Row>
			  
			</div>
		)
	}
}

export default Rides;