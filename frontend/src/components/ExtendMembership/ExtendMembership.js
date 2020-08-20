import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import { rooturl } from "../../config";

class ExtendMembership extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: [],
      selection: "",
      membership: [],
    };
  }

  componentDidMount() {
    this.getPrice();
    this.getUserInfo();
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
            this.setState({ membership: res.data });
          }
        }
      })
      .catch((err) => {});
  };
  getUserInfo = () => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .get(rooturl + "/viewuserbyemail?email=" + localStorage.getItem("email"))
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            this.setState({ user_info: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  terminate = (event) => {
    event.preventDefault();

    console.log(this.state.user_info);

    axios
      .post(rooturl + "/terminateuser", this.state.user_info)
      .then((res) => {
        console.log(res.status);
        let result = this.state.membership.filter((item) =>
          item.membership_type.includes(this.state.selection)
        );
        if (res.status === 200) {
          const amount = alert(
            "We will miss you! Drop us a mail, if you change your mind "
          );
          this.props.history.push("/logout");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.authFail(err.response.data.msg);
      });
  };

  submitHandler = (event) => {
    if (this.state.selection != "") {
      event.preventDefault();
      const data = {
        email: localStorage.getItem("email"),
        months: this.state.selection,
      };
      let formData = this.state.membership;
      console.log(formData);
      axios
        .post(rooturl + "/extendmembership", data)
        .then((res) => {
          console.log(res.status);
          let result = this.state.membership.filter((item) =>
            item.membership_type.includes(this.state.selection)
          );
          if (res.status === 200) {
            const amount = alert(
              "Success! Amount " + result[0].price + "$  has been debited"
            );
            if (res.data) {
              let tempData = [];
              Object.assign(tempData, this.state.user_info);

              tempData.membershipEndDate = res.data;
              this.setState({ user_info: tempData });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.authFail(err.response.data.msg);
        });
    } else {
      alert("Please select an option");
    }
  };

  render() {
    const Month6 = "6 Months";
    let xyz = this.state.membership;
    const Month12 = "12 Months";
    return (
      <Container className="m-5 d-flex justify-content-center">
        <Form>
          <div>
            <h1> Hello {this.state.user_info.name},</h1>
          </div>
          <br></br>
          <div>
            <h1>
              Your membership ends on{" "}
              <font color="green">
                {this.state.user_info.membershipEndDate}
              </font>
            </h1>
            <h2>Would you like to extend it ?</h2>
          </div>
          <br></br>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridMobile">
              <Form.Check
                type="radio"
                value="6"
                label={
                  Month6 +
                  " (" +
                  (xyz &&
                    xyz.filter((item) =>
                      item.membership_type.includes("6")
                    )[0] &&
                    xyz.filter((item) => item.membership_type.includes("6"))[0]
                      .price) +
                  "$)"
                }
                checked={this.state.selection == 6}
                onChange={(event) =>
                  this.setState({
                    selection: 6,
                  })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridDOB">
              <Form.Check
                type="radio"
                value="12"
                label={
                  Month12 +
                  " (" +
                  (xyz &&
                    xyz.filter((item) =>
                      item.membership_type.includes("12")
                    )[0] &&
                    xyz.filter((item) => item.membership_type.includes("12"))[0]
                      .price) +
                  "$)"
                }
                checked={this.state.selection == 12}
                onChange={(event) =>
                  this.setState({
                    selection: 12,
                  })
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button
              variant="primary"
              type="submit"
              onClick={this.submitHandler}
            >
              Extend
            </Button>
          </Form.Row>
          <br></br>
          <Form.Row>or</Form.Row>
          <br></br>
          <Form.Row>
            <Button variant="primary" type="submit" onClick={this.terminate}>
              Terminate Membership
            </Button>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}
export default ExtendMembership;
