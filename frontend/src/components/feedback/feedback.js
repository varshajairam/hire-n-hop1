import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Rating from "react-rating";
import starempty from "./images/star-empty.png";
import starfull from "./images/star-full.png";
import axios from "axios";
import { rooturl } from "../../config";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_email: "",
      vehicle_id: "",
      comments: "",
      service_satisfaction: "",
      car_satisfaction: "",
    };
  }

  componentDidMount() {
    this.getUserId();
    console.log(this.state.user_email);
  }

  getUserId = () => {
    this.setState({ user_email: localStorage.getItem("email") });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    console.log("FORM 11!");
    axios
      .post(rooturl + "/feedback", this.state)
      .then((res) => {
        if (res.status == 200) {
          console.log("here?");
          console.log(this.state.user_email);
        }
      })
      .catch((err) => {});
  };

  render() {
    return (
      <Container className="m-5 d-flex justify-content-center">
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
      </Container>
    );
  }
}
export default Feedback;
