import React, { Component } from "react";
import Map from './Map';
import {Redirect} from 'react-router';

class UserProfile extends Component {
	render() {
		let redirectVar = null;
        if(!localStorage.getItem("email")){
            redirectVar = <Redirect to= "/"/>
        }
	  return(
		  <div>{redirectVar}
		  <Map
	   			google={this.props.google}
	   			center={{lat: 37.333930, lng: -121.910608}}
	   			height='300px'
	   			zoom={17}
	  					/>

		  </div>
		
		)
	}
  }

  export default UserProfile;