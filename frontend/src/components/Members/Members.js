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

class Members extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - 1 - index);
    this.state = {
      requiredItem: [],
      user_info: [],
      show: false,
      showAdd: false,
      key: "",
    };
    //this.saveModalDetails = this.saveModalDetails.bind(this);
    //this.addModalDetails = this.addModalDetails.bind(this);
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
    this.getMembers();
  }

  getMembers = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios.get(rooturl + "/allusers").then((res) => {
      if (res.status == 200) {
        if (res.data) {
          console.log(res.data);
          this.setState({ user_info: res.data });
        }
      }
    });
    // .catch((err) => {});
  };

  removeItem(item) {
    const newItems = this.state.user_info.filter((type) => {
      return type !== item;
    });

    axios
      .post(rooturl + "/terminateuser", item)
      .then((res) => {
        if (res.status === 200) {
          console.log("yay");
          console.log(res);
          this.setState({
            user_info: [...newItems],
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
    const list = this.state.user_info.map((item, index) => (
      <Col md="3">
        <Card
          bg="light"
          //style={{ width: "18rem" }}
          className="mt-2 border border-primary"
          key={item.id}
        >
          <Card.Body>
            <Card.Text id="rental_name">
              <b>Name: </b>
              {item.name}
            </Card.Text>
            <Card.Text id="rental_phone">
              <b>license#: </b> {item.licenseId}
            </Card.Text>

            <Card.Text id="rental_capacity">
              <b>Membership Start Date: </b>
              {item.membershipStartDate}
            </Card.Text>

            <Card.Text id="rental_location">
              <b>Membership End Date: </b>
              {item.membershipEndDate}
            </Card.Text>
            <Card.Link
              href="#"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  this.removeItem(item);
              }}
            >
              Terminate
            </Card.Link>
          </Card.Body>
        </Card>
      </Col>
    ));

    return (
      <div>
        <Container fluid>
          <Row>{list}</Row>
        </Container>
      </div>
    );
  }
}
export default Members;
