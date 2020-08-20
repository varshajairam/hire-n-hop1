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
import { UsaStates as usaStates } from "usa-states";
import { rooturl } from "../../config";

class RentalLocation extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - 1 - index);
    this.state = {
      requiredItem: [],
      type: [],
      show: false,
      showAdd: false,
      key: "",
    };
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.addModalDetails = this.addModalDetails.bind(this);
  }
  buildOptionsStates() {
    var usStates = new usaStates();
    var arr = [];
    usStates.states.forEach(function (entry) {
      arr.push(<option>{entry["abbreviation"]}</option>);
    });
    return arr;
  }
  componentDidMount() {
    this.getRentalLocations();
  }

  getRentalLocations = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios.get(rooturl + "/locations").then((res) => {
      if (res.status == 200) {
        if (res.data) {
          console.log(res.data);
          this.setState({ type: res.data });
        }
      }
    });
    // .catch((err) => {});
  };

  removeItem(item) {
    const newItems = this.state.type.filter((type) => {
      return type !== item;
    });

    axios
      .post(rooturl + "/deletelocation", item)
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
    newIds.name = e.target.elements[0].value;
    newIds.capcity = e.target.elements[1].value;
    newIds.phone = e.target.elements[2].value;
    newIds.apt = e.target.elements[3].value;
    newIds.street = e.target.elements[4].value;
    newIds.city = e.target.elements[5].value;
    newIds.state = e.target.elements[6].value;
    newIds.country = e.target.elements[7].value;
    newIds.zipcode = e.target.elements[8].value;

    console.log(newIds);
    console.log("great");

    axios.post(rooturl + "/addlocation", newIds).then((res) => {
      if (res.status === 200) {
        console.log("yay");
        console.log(res);
        console.log(res.config.data);
        console.log(this.state.type);

        this.setState({
          //     type: this.state.type.concat([res.config.data]),
          type: [...this.state.type, res.data],
          showAdd: false,
        });
        console.log(this.state.type);
        console.log("ok");
      }
    });
    /*
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
      });
      */
  }

  saveModalDetails(e) {
    e.preventDefault();
    const newIds = this.state.requiredItem;
    newIds.name = e.target.elements[0].value;
    newIds.capcity = e.target.elements[1].value;
    newIds.phone = e.target.elements[2].value;
    newIds.apt = e.target.elements[3].value;
    newIds.street = e.target.elements[4].value;
    newIds.city = e.target.elements[5].value;
    newIds.state = e.target.elements[6].value;
    newIds.country = e.target.elements[7].value;
    newIds.zipcode = e.target.elements[8].value;

    this.setState({ requiredItem: newIds });
    let temptype = this.state.requiredItem;
    console.log(temptype);
    axios
      .post(rooturl + "/editlocation", temptype)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            console.log(res.data);
            const rentals = this.state.type;
            rentals[this.state.index] = temptype;
            this.setState({ show: false, type: rentals });
          }
        }
      })
      .catch((err) => {});
  }

  render() {
    const list = this.state.type.map((item, index) => (
      <Col md="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Body>
            <div>
              <Card.Text id="rental_name">
                <b>Name: </b>
                {item.name}
              </Card.Text>
              <Card.Text id="rental_phone">
                <b>Phone: </b> {item.phone}
              </Card.Text>

              <Card.Text id="rental_capacity">
                <b>Capacity: </b>
                {item.capcity}
              </Card.Text>

              <Card.Text id="rental_location">
                <b>Address: </b>
                {item.apt}, {item.street},{item.city}, {item.state},
                {item.zipcode}
                {/* {
                item.apt + ", " + item.street,
                ", " + item.state,
                "- " + item.zipcode
              } */}
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
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));

    let modalData = this.state.requiredItem;
    return (
      <div style={{ paddingTop: 10 }}>
        <Container fluid>
          <Button variant="primary" onClick={() => this.showModalAdd()}>
            Add Rental Location
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
                  <Form.Label>Rental Location Name</Form.Label>
                  <Form.Control
                    type="name"
                    defaultValue={modalData && modalData.name}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="capacity">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="capacity"
                    defaultValue={modalData && modalData.capcity}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="phone">
                  <Form.Label>Phone #</Form.Label>
                  <Form.Control
                    type="phone"
                    defaultValue={modalData && modalData.phone}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="apt">
                  <Form.Label>Apartment #</Form.Label>
                  <Form.Control defaultValue={modalData && modalData.apt} />
                </Form.Group>

                <Form.Group as={Col} controlId="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control defaultValue={modalData && modalData.street} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control defaultValue={modalData && modalData.city} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={modalData && modalData.state}
                  >
                    <option>Choose</option>
                    {this.buildOptionsStates()}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="name" readonly="readOnly" value="US" />
                </Form.Group>

                <Form.Group as={Col} controlId="zip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control defaultValue={modalData && modalData.zipcode} />
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
            <Modal.Title>Add Rental Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addModalDetails}>
              <Form.Row>
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Retal Location Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="capcity">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control type="number" placeholder="cpty." />
                </Form.Group>
                <Form.Group as={Col} controlId="phone">
                  <Form.Label>Phone #</Form.Label>
                  <Form.Control type="name" placeholder="Enter Phone #" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="apt">
                  <Form.Label>Apartment #</Form.Label>
                  <Form.Control placeholder="Apartment" />
                </Form.Group>

                <Form.Group as={Col} controlId="street">
                  <Form.Label>Street</Form.Label>
                  <Form.Control placeholder="Street" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="City" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select">
                    <option>Choose</option>
                    {this.buildOptionsStates()}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" readonly="readOnly" value="US" />
                </Form.Group>

                <Form.Group as={Col} controlId="zip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zipcode"
                    maxLength="5"
                  />
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
export default RentalLocation;
