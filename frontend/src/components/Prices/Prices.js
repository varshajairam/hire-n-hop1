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

class Prices extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - 1 - index);
    this.state = { membership: [] };
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
    this.getPrice();
  }

  getPrice = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get(rooturl + "/membership")
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);

            this.setState({ membership: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  submitHandler(e) {
    console.log("jfhkshfkd");

    axios
      .post(rooturl + "/membership/updateprice", [
        e.target[0].value,
        e.target[1].value,
        e.target[2].value,
      ])
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(res);
          this.setState({ membership: res.data });
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
  /*
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

    axios.post("http://localhost:8080/api/addlocation", newIds).then((res) => {
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
    
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
      });
      
  }
  */
  /*
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
      .post("http://localhost:8080/api/editlocation", temptype)
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
*/
  render() {
    const list = this.state.membership.map((item, index) => (
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          {item.membership_type}:
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control
            style={{ width: "200px" }}
            type="name"
            defaultValue={item.price}
            //onChange={(event) => this.Change()}
          />
        </Form.Group>
        $
      </Form.Row>
    ));

    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form onSubmit={this.submitHandler}>
          {list}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    );
  }
}
export default Prices;
