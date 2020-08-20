import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useRef, useState, Component } from "react";
import axios from "axios";
import { Icon } from "semantic-ui-react";
import { SocialPeople } from "material-ui/svg-icons";
import { rooturl } from "../../config";

class VehicleList extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - index);
    this.state = {
      requiredItem: [],
      type: [],
      rental_location: [],
      vehicle_type: [],
      show: false,
      showAdd: false,
      key: "",
    };
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.addModalDetails = this.addModalDetails.bind(this);
  }
  componentDidMount() {
    this.getVehicles();
    this.getRentalLocations();
    this.getVehicleType();
  }

  getVehicles = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get(rooturl + "/allvehicles")
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            console.log(res.data);
            this.setState({ type: res.data });
          }
        }
      })
      .catch((err) => {});
  };
  getRentalLocations = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios.get(rooturl + "/locations").then((res) => {
      if (res.status == 200) {
        if (res.data) {
          console.log(res.data);
          console.log("k");
          this.setState({ rental_location: res.data });
        }
      }
    });
    // .catch((err) => {});
  };

  getVehicleType = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get(rooturl + "/allvehicletype")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            this.setState({ vehicle_type: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  removeItem(item) {
    const newItems = this.state.type.filter((type) => {
      return type !== item;
    });

    axios
      .post(rooturl + "/deletevehicle", item)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(res);
          this.setState({
            type: [...newItems],
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
      });
  }

  showModal = (key) => {
    this.setState({});
    this.setState({
      requiredItem: this.state.type[key],
      show: true,
      index: key,
    });
  };

  showModalAdd = () => {
    this.setState({ showAdd: true });
  };

  hideModalAdd = () => {
    this.setState({ showAdd: false });
  };

  hideModal = () => {
    this.setState({ show: false, type: this.state.type });
  };

  addModalDetails(e) {
    e.preventDefault();
    const newIds = {};
    newIds.vid = e.target.elements[0].value;
    newIds.license_no = e.target.elements[1].value;
    newIds.make = e.target.elements[2].value;
    newIds.model = e.target.elements[3].value;
    newIds.model_year = e.target.elements[4].value;
    newIds.current_mileage = e.target.elements[5].value;
    newIds.car_condition = e.target.elements[6].value;
    newIds.regisration_expiry = e.target.elements[7].value;
    newIds.last_serviced = e.target.elements[8].value;
    newIds.vehicle_type = e.target.elements[9].value;
    newIds.rental_location = e.target.elements[10].value;
    newIds.vehicle_picture = "";

    console.log(newIds);

    axios
      .post(rooturl + "/addvehicle", newIds)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(res);
          this.setState({
            //     type: this.state.type.concat([res.config.data]),
            type: [...this.state.type, res.data],
            showAdd: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
      });
    console.log("hh");
    console.log(this.state.type);
  }

  saveModalDetails(e) {
    e.preventDefault();
    const newIds = this.state.requiredItem;
    newIds.vid = e.target.elements[0].value;
    newIds.license_no = e.target.elements[1].value;
    newIds.make = e.target.elements[2].value;
    newIds.model = e.target.elements[3].value;
    newIds.model_year = e.target.elements[4].value;
    newIds.current_mileage = e.target.elements[5].value;
    newIds.car_condition = e.target.elements[6].value;
    newIds.regisration_expiry = e.target.elements[7].value;
    newIds.last_serviced = e.target.elements[8].value;
    newIds.vehicle_type = e.target.elements[9].value;
    newIds.rental_location = e.target.elements[10].value;

    this.setState({ requiredItem: newIds });
    let temptype = this.state.requiredItem;
    axios
      .post(rooturl + "/updatevehicle", temptype)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            console.log(res.data);
            const vehicles = this.state.type;
            vehicles[this.state.index] = temptype;
            this.setState({ show: false, type: vehicles });
          }
        }
      })
      .catch((err) => {});
  }

  render() {
    const list = this.state.type.map((item, index) => (
      <Col md="4">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Img variant="top" src={require("./Vehicle.jpg")} />
          <Card.Header as="h5">
            <b>Licence # </b>: {item.license_no} {item.make}, {item.model}
          </Card.Header>

          <Card.Body>
            <Card.Text id="year">
              {" "}
              <b> Year: </b> {item.model_year}
            </Card.Text>
            {/*
            Status:
            {item.status == 1 ? (
              <Button disabled size="sm" variant="success">
                Active
              </Button>
            ) : (
              <Button disabled size="sm" variant="danger">
                Inactive
              </Button>
            )}
            */}
            <Card.Text id="regisration_expiry">
              <b>Registration Expiry: </b> {item.regisration_expiry}
            </Card.Text>
            <Card.Text id="vid">
              <b>Vehicle ID: </b> {item.vid}
            </Card.Text>
            <Card.Text id="current_mileage">
              <b>Miles: </b> {item.current_mileage}
            </Card.Text>
            <Card.Text id="condition">
              <b>Condition: </b> {item.car_condition}
            </Card.Text>
            <Card.Text id="last_service">
              <b>Last Serviced: </b> {item.last_serviced}
            </Card.Text>
            <Card.Text id="vehicle_type">
              <b>Vehicle type: </b>
              {item.vehicle_type}
            </Card.Text>
            <Card.Text id="rental_location">
              <b>Rental Location: </b>
              {item.rental_location}
            </Card.Text>
            <Card.Link href="#" onClick={() => this.showModal(index)}>
              Edit
            </Card.Link>
            <Card.Link
              href="#"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  this.removeItem(item);
              }}
            >
              Delete
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    ));

    let modalData = this.state.requiredItem;

    return (
      <div style={{ paddingTop: 10 }}>
        <Container fluid>
          <Button variant="primary" onClick={() => this.showModalAdd()}>
            Add Vehicle
          </Button>
          <Row>{list}</Row>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {modalData && modalData.license_no}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.saveModalDetails}>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicvid">
                  <Form.Label>Vehicle Identification Number</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={modalData && modalData.vid}
                    maxLength="16"
                    disabled
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLicenseNo">
                  <Form.Label>License #</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={modalData && modalData.license_no}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicMake">
                  <Form.Label>Make</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={modalData && modalData.make}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicModel">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={modalData && modalData.model}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYear">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    as="select"
                    //value={modalData && modalData.model_year}
                  >
                    <option selected="selected" disabled="disabled">
                      {modalData && modalData.model_year}
                    </option>
                    {this.years.map((year, index) => {
                      return (
                        <option key={`year${index}`} defaultValue={year}>
                          {year}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicCurrentMileage">
                  <Form.Label>Current Mileage</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={modalData && modalData.current_mileage}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicCondition">
                  <Form.Label>Car Condition</Form.Label>
                  <Form.Control
                    as="select"
                    //defaultValue={modalData && modalData.car_condition}
                  >
                    <option selected="selected" disabled="disabled">
                      {modalData && modalData.car_condition}
                    </option>
                    <option>{"Good"}</option>
                    <option>{"Bad"}</option>
                    <option>{"Needs servicing"}</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicRegistrationExpiry">
                  <Form.Label>Registration Expiry</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={modalData && modalData.regisration_expiry}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLastServiced">
                  <Form.Label>Last Serviced</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={modalData && modalData.last_serviced}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicVehicleType">
                  <Form.Label>Vehicle Type</Form.Label>

                  <Form.Control as="select" placeholder="Choose vehicle type">
                    <option selected="selected" disabled="disabled">
                      {modalData && modalData.vehicle_type}
                    </option>
                    {this.state.vehicle_type.map((veh_type, index) => {
                      return (
                        <option
                          key={`rental_loc${index}`}
                          value={veh_type.vehicleType}
                        >
                          {veh_type.vehicleType}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicRentalLocation">
                  <Form.Label>Rental Location</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Choose rental location"
                  >
                    <option selected="selected" disabled="disabled">
                      {modalData && modalData.rental_location}
                    </option>
                    {this.state.rental_location.map((rental_loc, index) => {
                      return (
                        <option
                          key={`rental_loc${index}`}
                          value={rental_loc.id}
                        >
                          {rental_loc.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal for add*/}
        <Modal
          show={this.state.showAdd}
          onHide={this.hideModalAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addModalDetails}>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicvid">
                  <Form.Label>Vehicle Identification Number</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter VIN"
                    maxLength="16"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLicenseNo">
                  <Form.Label>License #</Form.Label>
                  <Form.Control type="name" placeholder="Enter license #" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicMake">
                  <Form.Control type="name" placeholder="Enter make" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicModel">
                  <Form.Control type="name" placeholder="Enter model" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridYear">
                  <Form.Control as="select" placeholder="Enter model year">
                    <option selected="selected" disabled="disabled">
                      {"Year"}
                    </option>
                    {this.years.map((year, index) => {
                      return (
                        <option key={`year${index}`} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicCurrentMileage">
                  <Form.Control
                    type="name"
                    placeholder="Enter Current Mileage"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicCondition">
                  <Form.Control
                    as="select"
                    placeholder="Choose Vehicle condition"
                  >
                    <option selected="selected" disabled="disabled">
                      {"Choose Vehicle condition"}
                    </option>
                    <option>{"Good"}</option>
                    <option>{"Bad"}</option>
                    <option>{"Needs servicing"}</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicRegistrationExpiry">
                  <Form.Label>Registration Expiry</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group as={Col} controlId="formBasicLastServiced">
                  <Form.Label>Last Serviced</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formBasicVehicleType">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Control as="select" placeholder="Choose vehicle type">
                    <option selected="selected" disabled="disabled">
                      {"Choose vehicle type"}
                    </option>
                    {this.state.vehicle_type.map((veh_type, index) => {
                      return (
                        <option
                          key={`rental_loc${index}`}
                          value={veh_type.vehicleType}
                        >
                          {veh_type.vehicleType}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formBasicRentalLocation">
                  <Form.Label>Rental Location</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder="Choose rental location"
                  >
                    <option selected="selected" disabled="disabled">
                      {"Choose rental location"}
                    </option>
                    {this.state.rental_location.map((rental_loc, index) => {
                      return (
                        <option
                          key={`rental_loc${index}`}
                          value={rental_loc.id}
                        >
                          {rental_loc.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModalAdd}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default VehicleList;
