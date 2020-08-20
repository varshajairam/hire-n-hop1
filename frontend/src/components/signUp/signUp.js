import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { UsaStates as usaStates } from "usa-states";
import axios from "axios";
import moment from "moment";
import ReactBootstrapSlider from "react-bootstrap-slider";
import { rooturl } from "../../config";

class SignUp extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.membership = "";
    this.years = Array.from(new Array(20), (val, index) => index + year);
    this.months = Array.from(new Array(12), (val, index) => index + 1);
    this.state = {
      name: "",
      email: "",
      password: "",
      mobile: "",
      dob: "",
      apt: "",
      street: "",
      city: "",
      state: "",
      country: "United States",
      zipcode: "",
      licenseState: "",
      licenseId: "",
      membershipStartDate: moment().format("YYYY-MM-DD"),
      membershipEndDate: "",
      cardNumber: "",
      cardExpiryMonth: "",
      cardExpiryYear: "",
      cardCvv: "",
    };
  }
  buildOptionsStates() {
    var usStates = new usaStates();
    var arr = [];
    usStates.states.forEach(function (entry) {
      arr.push(<option>{entry["abbreviation"]}</option>);
    });
    return arr;
  }

  submitHandler = (event) => {
    event.preventDefault();

    console.log(this.state);
    console.log("FORM 11!");
    console.log(moment().add(6, "months").format("YYYY-MM-DD"));

    axios.post(rooturl + "/signup", this.state).then((res) => {
      if (res.status === 200) {
        console.log("yay");

        console.log(res);
        this.props.history.push("/login");
        localStorage.setItem("admin", res.data.admin);
      }
    });
  };

  render() {
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <Form.Group controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                placeholder="+1xxxxxxxxxx"
                onChange={(event) =>
                  this.setState({ mobile: event.target.value })
                }
                maxLength="10"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter date of birth"
                onChange={(event) => this.setState({ dob: event.target.value })}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridApartment">
              <Form.Label>Apartment #</Form.Label>
              <Form.Control
                placeholder="Apartment"
                onChange={(event) => this.setState({ apt: event.target.value })}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                placeholder="Street"
                onChange={(event) =>
                  this.setState({ street: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={(event) =>
                  this.setState({ city: event.target.value })
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                value={this.state.state}
                onChange={(event) =>
                  this.setState({ state: event.target.value })
                }
              >
                <option>Choose</option>
                {this.buildOptionsStates()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="name"
                readonly="readOnly"
                value={this.state.country}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                onChange={(event) =>
                  this.setState({ zipcode: event.target.value })
                }
                maxLength="5"
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridLicenseState">
              <Form.Label>Licence state</Form.Label>
              <Form.Control
                as="select"
                value={this.state.licenseState}
                onChange={(event) =>
                  this.setState({ licenseState: event.target.value })
                }
              >
                <option>Choose</option>
                {this.buildOptionsStates()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLicenseId">
              <Form.Label>License #</Form.Label>
              <Form.Control
                placeholder="License #"
                onChange={(event) =>
                  this.setState({ licenseId: event.target.value })
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Check
                type="radio"
                value="6"
                label="6 months membership"
                checked={
                  this.state.membershipEndDate ===
                  moment().add(6, "months").format("YYYY-MM-DD")
                }
                onChange={(event) =>
                  this.setState({
                    membershipEndDate: moment()
                      .add(event.target.value, "months")
                      .format("YYYY-MM-DD"),
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Check
                type="radio"
                value="12"
                label="12 months membership"
                checked={
                  this.state.membershipEndDate ===
                  moment().add(12, "months").format("YYYY-MM-DD")
                }
                onChange={(event) =>
                  this.setState({
                    membershipEndDate: moment()
                      .add(event.target.value, "months")
                      .format("YYYY-MM-DD"),
                  })
                }
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridcc#">
            <Form.Label>Credit Card #</Form.Label>
            <Form.Control
              placeholder="Enter 16 digit credit card number"
              onChange={(event) =>
                this.setState({ cardNumber: event.target.value })
              }
              maxLength="16"
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridMonth">
              <Form.Label>Month</Form.Label>
              <Form.Control
                as="select"
                placeholder="Choose"
                onChange={(event) =>
                  this.setState({ cardExpiryMonth: event.target.value })
                }
              >
                <option>Choose</option>
                {this.months.map((month, index) => {
                  return (
                    <option key={`month${index}`} value={month}>
                      {month}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridYear">
              <Form.Label>Year</Form.Label>
              <Form.Control
                as="select"
                placeholder="Choose"
                onChange={(event) =>
                  this.setState({ cardExpiryYear: event.target.value })
                }
              >
                <option>Choose</option>
                {this.years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCvv">
              <Form.Label>cvv</Form.Label>
              <Form.Control
                onChange={(event) =>
                  this.setState({ cardCvv: event.target.value })
                }
                maxLength="3"
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit" onClick={this.submitHandler}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUp;
