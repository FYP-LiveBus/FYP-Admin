import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapView extends Component {
  constructor(props){
    super(props);
    this.state = { 
      center: {
        lat: 31.4173677,
        lng: 74.2373817
      },
      zoom: 11
    };
  }
  
  componentDidMount() {
    navigator.geolocation.watchPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  static defaultProps = {
    center: {
      lat: 31.4173677,
      lng: 74.2373817
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAI7fdb3cSLp4-TbhZsonR3Gflc8TSUXs4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapView;