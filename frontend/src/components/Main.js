import React, { Component } from "react";
import { Route } from "react-router-dom";
import "../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import RentalLogin from "./rentalLogin/rentalLogin";
import SignUp from "./signUp/signUp";
import Feedback from "./feedback/feedback";
import Navigation from "./Navbar/Navbar";
import VehicleList from "./VehicleList/VehicleList";
import VehicleType from "./VehicleType/VehicleType";
import { Vehicle } from "./vehicle/Vehicle";
import RentalLocation from "./RentalLocation/RentalLocation";
import Members from "./Members/Members";
import { Logout } from "./logout/logout";
import UserProfile from "./user/Profile";
import Rides from "./rides/rides";
import ExtendMembership from "./ExtendMembership/ExtendMembership";
import Prices from "./Prices/Prices";
class Home extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Navigation} />
        <Route exact path="/" component={RentalLogin} />
        <Route exact path="/login" component={RentalLogin} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/VehicleList" component={VehicleList} />
        <Route path="/VehicleType" component={VehicleType} />
        <Route exact path="/feedback" component={Feedback} />
        <Route path="/RentalLocation" component={RentalLocation} />
        <Route path="/Members" component={Members} />
        <Route exact path="/profile" component={UserProfile} />
        <Route path="/vehicles" component={Vehicle} />
        <Route path="/rides" component={Rides} />
        <Route path="/logout" component={Logout} />
        <Route path="/ExtendMembership" component={ExtendMembership} />
        <Route path="/Prices" component={Prices} />
      </div>
    );
  }
}
//export Home Component
export default Home;
