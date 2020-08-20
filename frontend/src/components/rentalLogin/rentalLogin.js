import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { rooturl } from "../../config";

class RentalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.username,
      password: this.state.password,
    };
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(data);
    console.log("FORM 11!");

    axios.post(rooturl + "/login", data).then((res) => {
      if (res.status === 200 && res.data != "") {
        console.log("yay");
        console.log(res);
        //this.props.history.push('/profile');

        localStorage.setItem("admin", res.data.admin);
        localStorage.setItem("email", res.data.email);
        this.props.history.push("/profile");
      } else {
        alert("Invalid Credentials. Please try again");
      }
    });
  };

  render() {
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.submitHandler}>
            Sign-in
          </Button>
        </Form>
      </Container>
    );
  }
}
export default RentalLogin;
