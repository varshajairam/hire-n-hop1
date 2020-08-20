import React from "react";
import { useRef, useState, Component } from "react";
import { Form, Card, Button, Col, FormGroup, Row } from "react-bootstrap";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  google,
} from "react-google-maps";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
// import Autocomplete from 'react-google-autocomplete';
import { rooturl } from "../../config";
// import { connect } from 'react-redux';
import axios from "axios";
import Geocode from "react-geocode";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
Geocode.setApiKey("<GOOGLE_API_KEY>");
Geocode.enableDebug();

// const mapStateToProps = (state) => {
//     return {
//         showvehicles: state.profileData.showvehicles,
// 		allvehicles: state.profileData.allvehicles,
// 		address: state.profileData.address,
// 		mapPosition: state.profileData.mapPosition,
// 		markerPosition: state.profileData.markerPosition,
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         allVehicles: (data) => dispatch(allVehicles(data)),
// 		showVehicles: (data) => dispatch(showVehicles(data)),
// 		setAddress: (data) => dispatch(setAddress(data)),
// 		setMapPosition: (data) => dispatch(setMapPosition(data)),
// 		setMarkerPosition: (data) => dispatch(setMarkerPosition(data)),
//     }
// }

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      //    city: '',
      //    area: '',
      //    state: '',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      showvehicle: false,
      allvehicles: [],
      selectedvehicle: null,
      startdatetime: "",
      enddatetime: "",
      vehicle_type: [],
      vehicle_type_slider: [],
      vehicle_make: [],
      vehicle_make1: ["X", "Y"],
      selected_vehicle_type: "",
      vehicle_model: [],
      item: { hourList: [1, 2, 3], priceList: ["2", "3", "4"] },
    };

    // this.props.setMapPosition({
    // 	lat: this.props.center.lat,
    // 	lng: this.props.center.lng
    // 	});

    // this.props.setMarkerPosition({
    // 	lat: this.props.center.lat,
    // 	lng: this.props.center.lng
    // 	})

    this.search = this.search.bind(this);
    this.getVehicleMake = this.getVehicleMake.bind(this);
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    this.getVehicleType();
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        //  addressArray =  response.results[0].address_components,
        //  city = this.getCity( addressArray ),
        //  area = this.getArea( addressArray ),
        //  state = this.getState( addressArray );

        //  console.log( 'address', addressArray );

        this.setState({
          address: address ? address : "",
          //  area: ( area ) ? area : '',
          //  city: ( city ) ? city : '',
          //  state: ( state ) ? state : '',
        });
        // this.props.setAddress(( address ) ? address : '')
      },
      (error) => {
        console.error(error);
      }
    );
  }

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
            this.setState({
              vehicle_type: res.data,
            });
          }
        }
      })
      .catch((err) => {});
  };

  getVehicleMake = (e) => {
    e.preventDefault();
    const vehicle_type = e.target.value;

    let params = new URLSearchParams();
    params.set("vehicle_type", vehicle_type);
    console.log(params.toString());

    axios
      .get(rooturl + "/make?" + params.toString())
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            this.setState({ vehicle_make: res.data });
            this.setState({ selected_vehicle_type: vehicle_type });
          }
        }
      })
      .catch((err) => {});
  };

  getVehicleModel = (e) => {
    e.preventDefault();
    const vehicle_make = e.target.value;

    let params = new URLSearchParams();
    params.set("vehicle_type", this.state.selected_vehicle_type);
    params.set("make", vehicle_make);
    console.log(params.toString());

    axios
      .get(rooturl + "/model?" + params.toString())
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            this.setState({ vehicle_model: res.data });
          }
        }
      })
      .catch((err) => {});
  };

  handleChangeComplete = (event) => {
    let typeCopy = JSON.parse(JSON.stringify(this.state.vehicle_type_slider));
    console.log();

    typeCopy[0].value = this.state.vehicle_type_slider[0].priceList[
      this.state.vehicle_type_slider[0].hourList.findIndex((v) => v === event)
    ];
    console.log(typeCopy);
    this.setState({
      vehicle_type_slider: typeCopy,
    });
  };

  handleChange = (address) => {
    this.setState({ address });
    // this.props.setAddress({address})
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        getLatLng(results[0]);
        this.setState({
          address: address,
        });
        //   this.props.setAddress({address})
      })
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.allvehicles !== nextState.allvehicles ||
      this.state.showvehicle !== nextState.showvehicle ||
      this.state.selectedvehicle !== nextState.selectedvehicle ||
      this.state.startdatetime !== nextState.startdatetime ||
      this.state.enddatetime !== nextState.enddatetime ||
      this.state.vehicle_make !== nextState.vehicle_make ||
      this.state.selected_vehicle_type !== nextState.selected_vehicle_type ||
      this.state.vehicle_type !== nextState.vehicle_type ||
      this.state.vehicle_model !== nextState.vehicle_model ||
      this.state.item !== nextState.item ||
      this.state.vehicle_type_slider !== nextState.vehicle_type_slider
      //    this.state.city !== nextState.city ||
      //    this.state.area !== nextState.area ||
      //    this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  //  getCity = ( addressArray ) => {
  //   let city = '';
  //   for( let i = 0; i < addressArray.length; i++ ) {
  //    if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
  //     city = addressArray[ i ].long_name;
  //     return city;
  //    }
  //   }
  //  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  //  getArea = ( addressArray ) => {
  //   let area = '';
  //   for( let i = 0; i < addressArray.length; i++ ) {
  //    if ( addressArray[ i ].types[0]  ) {
  //     for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
  //      if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
  //       area = addressArray[ i ].long_name;
  //       return area;
  //      }
  //     }
  //    }
  //   }
  //  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  //  getState = ( addressArray ) => {
  //   let state = '';
  //   for( let i = 0; i < addressArray.length; i++ ) {
  //    for( let i = 0; i < addressArray.length; i++ ) {
  //     if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
  //      state = addressArray[ i ].long_name;
  //      return state;
  //     }
  //    }
  //   }
  //  };
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      //    city = this.getCity( addressArray ),
      //    area = this.getArea( addressArray ),
      //    state = this.getState( addressArray ),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      //    area: ( area ) ? area : '',
      //    city: ( city ) ? city : '',
      //    state: ( state ) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });

    // this.props.setAddress(( address ) ? address : '');
    // this.props.setMarkerPosition({
    // 	lat: latValue,
    // 	lng: lngValue
    // });
    // this.props.setMapPosition({
    // 	lat: latValue,
    // 	lng: lngValue
    // });
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    console.log("event", event);
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng(),
      addressArray = [];
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        //  addressArray =  response.results[0].address_components,
        //  city = this.getCity( addressArray ),
        //  area = this.getArea( addressArray ),
        //  state = this.getState( addressArray );
        this.setState({
          address: address ? address : "",
          //  area: ( area ) ? area : '',
          //  city: ( city ) ? city : '',
          //  state: ( state ) ? state : ''
        });
        // this.props.setAddress(( address ) ? address : '');
      },
      (error) => {
        console.error(error);
      }
    );
  };

  search = (event) => {
    event.preventDefault();
    let params = new URLSearchParams();
    params.set("address", event.target.elements[0].value);
    params.set(
      "startdatetime",
      event.target.elements[1].value + " " + event.target.elements[2].value
    );
    params.set(
      "enddatetime",
      event.target.elements[3].value + " " + event.target.elements[4].value
    );

    params.set("make", event.target.elements[7].value);

    params.set("model", event.target.elements[8].value);

    this.setState({
      //showvehicles: !this.state.showvehicles,
      // startdatetime: res.data
      // startdatetime: event.target.elements[1].value + ' ' + event.target.elements[2].value,
      enddatetime:
        event.target.elements[3].value + " " + event.target.elements[4].value,
    });
    this.setState({
      //showvehicles: !this.state.showvehicles,
      // startdatetime: res.data
      startdatetime:
        event.target.elements[1].value + " " + event.target.elements[2].value,
      // enddatetime: event.target.elements[3].value + ' ' + event.target.elements[4].value
    });
    axios
      .get(rooturl + "/location?" + params.toString())
      .then((res) => {
        if (res.status === 200) {
          if (res.data) {
            // this.props.allVehicles(res.data);
            // this.props.showVehicles(true);
            this.setState({
              //showvehicles: !this.state.showvehicles,
              allvehicles: res.data,
              // startdatetime: event.target.elements[1].value + ' ' + event.target.elements[2].value,
              // enddatetime: event.target.elements[3].value + ' ' + event.target.elements[4].value
            });
            this.setState({
              //showvehicles: !this.state.showvehicles,
              // startdatetime: res.data
              // startdatetime: event.target.elements[1].value + ' ' + event.target.elements[2].value,
              enddatetime:
                event.target.elements[3].value +
                " " +
                event.target.elements[4].value,
            });
            this.setState({
              //showvehicles: !this.state.showvehicles,
              // startdatetime: res.data
              startdatetime:
                event.target.elements[1].value +
                " " +
                event.target.elements[2].value,
              // enddatetime: event.target.elements[3].value + ' ' + event.target.elements[4].value
            });
            //this.setVehicles(res.data);
          }
        }
      })
      .catch((err) => {
        //this.props.setError(err.response.data);
      });
  };

  setVehicles = (data) => {
    this.setState({
      showvehicle: true,
      allvehicles: [...data],
    });
  };

  showSelectedCar = (action, vehicle) => {
    console.log(vehicle.vehicle_type);

    let vehicleTypeAll = this.state.vehicle_type.filter((vtype) => {
      return vtype.vehicleType === vehicle.vehicle_type;
    });

    console.log(vehicleTypeAll);

    this.setState({
      showvehicle: action,
      selectedvehicle: vehicle,
      vehicle_type_slider: vehicleTypeAll,
    });
  };

  reserve = (action, vehicle) => {
    const data = {
      user_email: localStorage.getItem("email"),
      vehicle_id: vehicle.id,
      location_id: vehicle.rental_location,
      start_time: this.state.startdatetime + ":00",
      end_time: this.state.enddatetime + ":00",
    };
    axios
      .post(rooturl + "/reservation", data)
      .then((response) => {
        console.log("Response Status: " + response.status);
        if (response.status === 200) {
          this.setState({
            showvehicle: false,
          });
        }
      })
      .catch((err) => {});
  };

  render() {
    const searchPlace = (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* For Auto complete Search Box */}
          {/* <Form> */}
          {/* <Form.Row>
	      <Form.Group as={Col} controlId="formGridCity">
		  <Form.Label>Location</Form.Label>
			<Autocomplete
			style={{
				width: '100%',
				height: '40px',
				paddingLeft: '16px',
				marginTop: '2px',
				marginBottom: '100px'
			}}
			onPlaceSelected={ this.onPlaceSelected }
			types={['(regions)']}
			/>
		  </Form.Group>
		  <Form.Group as={Col} controlId="formGridStartDate">
            <Form.Label>Start date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridEndDate">
            <Form.Label>End date</Form.Label>
            <Form.Control type="date"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"/>
          </Form.Group>
		  <Form.Group as={Col} controlId="formGridSearch">
		  <Button variant="success" type="submit" style={{ marginTop: '32px' }}>
            Search
          </Button>
		  </Form.Group>
	  </Form.Row>
	  </Form> */}
          {/* <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '2px',
        marginBottom: '100px'
       }}
       onPlaceSelected={ this.onPlaceSelected }
       types={['(regions)']}
      /> */}

          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <Form onSubmit={this.search}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Location</Form.Label>
                {/* <Form.Control type="name" placeholder="Enter name" value={ this.state.address} readOnly="readOnly"/> */}
                {searchPlace}
              </Form.Group>
              <Form.Group as={Col} controlId="formGridStartDate">
                <Form.Label>Start date</Form.Label>
                <Form.Control type="date" onload="getDate()" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEndDate">
                <Form.Label>End date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridSearch">
                <Button
                  variant="success"
                  type="submit"
                  style={{ marginTop: "32px" }}
                >
                  Search
                </Button>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicVehicleType">
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Choose vehicle type"
                  style={{ width: "200px" }}
                  onChange={this.getVehicleMake}
                >
                  <option selected="selected" disabled="disabled">
                    {"Choose Vehicle Type"}
                  </option>
                  {this.state.vehicle_type.map((veh_type, index) => {
                    return (
                      <option
                        key={`veh_type${index}`}
                        value={veh_type.vehicleType}
                      >
                        {veh_type.vehicleType}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicVehicleType">
                <Form.Label>Make</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  as="select"
                  placeholder="Choose vehicle type"
                  onChange={this.getVehicleModel}
                >
                  <option selected="selected" disabled="disabled">
                    {"Choose Make"}
                  </option>
                  {this.state.vehicle_make.map((veh_type, index) => {
                    return (
                      <option key={`veh_type${index}`} value={veh_type}>
                        {veh_type}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formBasicVehicleType">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  as="select"
                  placeholder="Choose vehicle Model "
                >
                  <option selected="selected" disabled="disabled">
                    {"Choose Model"}
                  </option>
                  {this.state.vehicle_model.map((veh_type, index) => {
                    return (
                      <option key={`veh_type${index}`} value={veh_type}>
                        {veh_type}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
          {/* <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Enter city" value={ this.state.city} readOnly="readOnly"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridArea">
              <Form.Label>Area</Form.Label>
              <Form.Control type="name" placeholder="Enter area" value={ this.state.area} readOnly="readOnly"/>
            </Form.Group>
			<Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control type="name" placeholder="Enter state" value={ this.state.state} readOnly="readOnly"/>
            </Form.Group>
          </Form.Row>  */}
          {/* </Form> */}

          <AsyncMap
            googleMapURL="<GOOGLE_API_KEY>"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          {/* {searchPlace} */}
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }

    let vehicle;
    if (this.state.showvehicle) {
      vehicle = (
        <Card
          bg="light"
          style={{ width: "40rem", paddingRight: "100px" }}
          className="mt-2"
        >
          <Card.Body>
            <Card.Header style={{ fontWeight: "900" }}>
              Does everything look ok?
            </Card.Header>
            <Card.Text id="type">
              <b>Type:</b> {this.state.selectedvehicle.vehicle_type}
            </Card.Text>
            <Card.Text id="make">
              <b>Make:</b> {this.state.selectedvehicle.make}
            </Card.Text>
            <Card.Text id="model">
              <b>Model: </b> {this.state.selectedvehicle.model}
            </Card.Text>
            <Card.Text id="car_condition">
              <b>Condition: </b> {this.state.selectedvehicle.car_condition}
            </Card.Text>
            <Card.Text id="model_year">
              <b>Model Year: </b> {this.state.selectedvehicle.model_year}
            </Card.Text>
            <p>
              <b>Hours:</b>
            </p>
            {this.state.vehicle_type_slider.length > 0 &&
              this.state.vehicle_type_slider[0].hourList && (
                <div>
                  <Slider
                    min={0}
                    max={Math.max(
                      ...this.state.vehicle_type_slider[0].hourList
                    )}
                    defaultValue={0}
                    marks={Object.assign(
                      { 0: 0 },
                      ...this.state.vehicle_type_slider[0].hourList.map(
                        (value) => ({
                          [value]: value,
                        })
                      )
                    )}
                    step={null}
                    onChange={(e) => this.handleChangeComplete(e)}
                  />
                  &nbsp;
                  <p>
                    <b>Price:</b> {this.state.vehicle_type_slider[0].value}$
                  </p>
                </div>
              )}

            <Card.Text id="rental_location">
              <b>Address:</b> {this.state.selectedvehicle.address}
            </Card.Text>
            {/* onClick={() => this.showSelectedJob(true, this.state.allvehicles[key]) */}
            <Button
              variant="success"
              onClick={() => this.reserve(true, this.state.selectedvehicle)}
            >
              Book this car
            </Button>
          </Card.Body>
        </Card>
      );
    }

    let list;
    list = Object.keys(this.state.allvehicles).map((key) => (
      <Col>
        <Card
          bg="light"
          style={{ width: "30rem", paddingRight: "100px" }}
          className="mt-2"
        >
          <Card.Body>
            {/* <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={() => props.controlModal(true, this.props.allvehicles[key])}
        >
          {this.props.allvehicles[key].vehicle_type}
        </Button> */}
            <Card.Text id="type">
              <b>Type:</b> {this.state.allvehicles[key].vehicle_type}
            </Card.Text>
            <Row>
              <Col id="make">
                {" "}
                <b>Make:</b> {this.state.allvehicles[key].make}{" "}
              </Col>
            </Row>
            <Row>
              <Col id="model">
                <b>Model: </b> {this.state.allvehicles[key].model}
              </Col>
            </Row>
            <Row>
              <Col id="car_condition">
                <b>Condition:</b> {this.state.allvehicles[key].car_condition}
              </Col>
            </Row>
            <Row>
              <Col id="model_year">
                {" "}
                <b>Model Year: </b> {this.state.allvehicles[key].model_year}
              </Col>
            </Row>
            <Row>
              <Col id="model_year">
                {" "}
                <b>Address: </b> {this.state.allvehicles[key].address}
              </Col>
            </Row>
            <Button
              variant="success"
              onClick={() =>
                this.showSelectedCar(true, this.state.allvehicles[key])
              }
            >
              Select Car
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
    //}
    return (
      <div>
        {map}
        <Row>
          <Col md={4}>{list}</Col>
          <Col>{vehicle}</Col>
        </Row>
      </div>
    );
  }
}
export default Map;
