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
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { rooturl } from "../../config";

class VehicleType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requiredItem: 0,
      type: [],
      show: false,
      modalData: {},
      showAdd: false,
      modalAddData: { vehicleType: "", hourList: [""], priceList: [""] },
    };
    this.saveModalDetails = this.saveModalDetails.bind(this);
    this.saveModalDetailsAdd = this.saveModalDetailsAdd.bind(this);
  }

  componentDidMount() {
    this.getVehicles();
  }
  getVehicles = () => {
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
            this.setState({ type: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  removeItem(item) {
    const newItems = this.state.type.filter((type) => {
      return type !== item;
    });
    console.log(item.vehicleType);
    axios
      .post(rooturl + "/deletevehicletype", {
        vehicle_type: item.vehicleType,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(item);
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

  showModal = (e, key) => {
    console.log("calle?1");
    console.log(key);
    //const requiredItem = this.state.requiredItem;
    console.log(this.state.type[key]);
    let edit = JSON.parse(JSON.stringify(this.state.type[key]));

    //Object.assign(this.state.modalData, this.state.type[requiredItem]);
    //Object.assign(edit, this.state.type[key]);
    //const edit = [...this.state.type][key];

    this.setState({
      modalData: edit,
      requiredItem: key,
      show: true,
    });
    console.log(this.state.modalData);
  };

  hideModal = () => {
    console.log("calle?2");
    this.setState({ show: false });
  };

  showModalAdd = () => {
    console.log("check here");

    this.setState({
      showAdd: true,
      modalAddData: { vehicleType: "", hourList: [""], priceList: [""] },
    });
  };

  hideModalAdd = () => {
    this.setState({ showAdd: false });
  };
  saveModalDetails(e) {
    e.preventDefault();
    console.log(this.state.modalData);
    axios
      .post(rooturl + "/updatevehicletype", this.state.modalData)
      .then((res) => {
        if (res.status == 200) {
          const editType = this.state.type;
          editType[this.state.requiredItem] = JSON.parse(
            JSON.stringify(this.state.modalData)
          );

          this.setState({
            type: editType,
            show: false,
          });
        }
      })
      .catch((err) => {});
  }

  saveModalDetailsAdd(e) {
    e.preventDefault();
    console.log("why?");
    console.log(this.state.modalAddData);

    axios
      .post(rooturl + "/addvehicletype", this.state.modalAddData)
      .then((res) => {
        if (res.status == 200) {
          if (res.data) {
            this.setState({
              //     type: this.state.type.concat([res.config.data]),
              type: [...this.state.type, res.data],
              showAdd: false,
            });
          }
        }
      })
      .catch((err) => {});
  }

  handleHourChange(event, index) {
    let tempHourModal = JSON.parse(JSON.stringify(this.state.modalData));
    if (index > tempHourModal.hourList.length) {
      tempHourModal.hourList = [
        ...tempHourModal.hourList,
        parseInt(event.target.value),
      ];
    } else {
      tempHourModal.hourList[index] = parseInt(event.target.value);
    }
    this.setState({
      modalData: tempHourModal,
    });
  }

  handlePriceChange(event, index) {
    let tempHourModal = JSON.parse(JSON.stringify(this.state.modalData));
    if (index > tempHourModal.priceList.length) {
      tempHourModal.priceList = [
        ...tempHourModal.priceList,
        parseInt(event.target.value),
      ];
    } else {
      tempHourModal.priceList[index] = event.target.value;
    }
    this.setState({
      modalData: tempHourModal,
    });
  }

  handleAddVehicleType(e) {
    console.log("99999999999");
    let tempNameModal = JSON.parse(JSON.stringify(this.state.modalAddData));
    tempNameModal.vehicleType = e.target.value;
    this.setState({
      modalAddData: tempNameModal,
    });
  }

  handleHourChangeAdd(event, index) {
    let tempHourModal = JSON.parse(JSON.stringify(this.state.modalAddData));
    console.log(tempHourModal);
    if (index > tempHourModal.hourList.length) {
      tempHourModal.hourList = [
        ...tempHourModal.hourList,
        parseInt(event.target.value),
      ];
    } else {
      tempHourModal.hourList[index] = parseInt(event.target.value);
    }
    this.setState({
      modalAddData: tempHourModal,
    });
    console.log(this.state.modalAddData);
  }

  handlePriceChangeAdd(event, index) {
    let tempPriceModal = JSON.parse(JSON.stringify(this.state.modalAddData));
    if (index > tempPriceModal.priceList.length) {
      tempPriceModal.priceList = [
        ...tempPriceModal.priceList,
        parseInt(event.target.value),
      ];
    } else {
      console.log("comming here?");
      tempPriceModal.priceList[index] = event.target.value;
    }
    this.setState({
      modalAddData: tempPriceModal,
    });
    console.log(this.state.modalAddData);
  }
  /*
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
*/
  handleAddRow = () => {
    console.log("calle?4");
    this.state.modalData.priceList = [...this.state.modalData.priceList, ""];
    this.state.modalData.hourList = [...this.state.modalData.hourList, ""];
    console.log("wow");
    console.log(this.state.modalData);
    console.log("checking modal");
  };

  handleAddRowAdd = () => {
    console.log("okwhat");
    this.state.modalAddData.priceList = [
      ...this.state.modalAddData.priceList,
      "",
    ];
    this.state.modalAddData.hourList = [
      ...this.state.modalAddData.hourList,
      "",
    ];
  };

  handleRemoveRow = (key) => {
    if (this.state.modalData.priceList.length > 1) {
      this.state.modalData.priceList.splice(key, 1);
      this.state.modalData.hourList.splice(key, 1);
    }
  };

  handleRemoveRowAdd = (key) => {
    if (this.state.modalAddData.priceList.length > 1) {
      this.state.modalAddData.priceList.splice(key, 1);
      this.state.modalAddData.hourList.splice(key, 1);
    }
  };

  handleChangeComplete = (x, event) => {
    var obj = this.state.type[0].priceList.reduce(function (o, val) {
      o[val] = val;
      return o;
    }, {});
    console.log("whaaaat?");
    console.log(JSON.stringify(obj));
    let typeCopy = JSON.parse(JSON.stringify(this.state.type));
    console.log();
    typeCopy[x].value = this.state.type[x].priceList[
      this.state.type[x].hourList.findIndex((v) => v === event)
    ];

    console.log(typeCopy);
    this.setState({
      type: typeCopy,
    });
  };

  render() {
    const list = this.state.type.map((item, index) => (
      <Col sm="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Header as="h5">Type: {item.vehicleType}</Card.Header>

          <Card.Body>
            <Row>
              <div style={{ width: 400, margin: 5 }}>
                <p>Hours:</p>
                <Slider
                  min={0}
                  max={Math.max(...item.hourList)}
                  defaultValue={0}
                  marks={Object.assign(
                    { 0: 0 },
                    ...item.hourList.map((value) => ({
                      [value]: value,
                    }))
                  )}
                  step={null}
                  onChange={(e) => this.handleChangeComplete(index, e)}
                />
                &nbsp;
                <p>Price: {item.value}$</p>
              </div>
            </Row>

            <Card.Link href="#" onClick={(e) => this.showModal(e, index)}>
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

    return (
      <div style={{ paddingTop: 10 }}>
        <Container>
          <Button variant="primary" onClick={() => this.showModalAdd()}>
            Add Vehicle Type
          </Button>
          <Row>{list}</Row>
        </Container>
        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  type="vehicle"
                  placeholder={
                    this.state.modalData && this.state.modalData.vehicleType
                  }
                  disabled
                />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Hours</th>
                      <th>Price $</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.modalData &&
                      this.state.modalData.hourList &&
                      this.state.modalData.hourList.map((row, index) => {
                        return (
                          <tr key={row}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                step="1"
                                defaultValue={row}
                                onChange={(e) =>
                                  this.handleHourChange(e, index)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={
                                  this.state.modalData &&
                                  this.state.modalData.priceList &&
                                  this.state.modalData.priceList[index]
                                }
                                onChange={(e) =>
                                  this.handlePriceChange(e, index)
                                }
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => this.handleRemoveRow(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={this.handleAddRow}
                >
                  Add Row
                </button>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.saveModalDetails}
              >
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

        <Modal
          show={this.state.showAdd}
          onHide={this.hideModalAdd}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Vehicle Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  type="vehicle"
                  placeholder="Enter Vehicle Type"
                  onChange={(e) => this.handleAddVehicleType(e)}
                />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Hours</th>
                      <th>Price $</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.modalAddData &&
                      this.state.modalAddData.hourList &&
                      this.state.modalAddData.hourList.map((row, index) => {
                        return (
                          <tr key={row}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                step="1"
                                defaultValue={row}
                                onChange={(e) =>
                                  this.handleHourChangeAdd(e, index)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={
                                  this.state.modalAddData &&
                                  this.state.modalAddData.priceList &&
                                  this.state.modalAddData.priceList[index]
                                }
                                onChange={(e) =>
                                  this.handlePriceChangeAdd(e, index)
                                }
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => this.handleRemoveRowAdd(index)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={this.handleAddRowAdd}
                >
                  Add Row
                </button>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.saveModalDetailsAdd}
              >
                Save Changes
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
export default VehicleType;
