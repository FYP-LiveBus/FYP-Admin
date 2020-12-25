import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import firebase from 'firebase';
import firebaseConfig from '../../firebase'
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapView extends Component {
  
  constructor(props){
    super(props);
    this.state = { 
      location: {
        lat: 31.4173677,
        lng: 74.2373817
      },
      zoom: 11
    };
  }
  
  
  componentDidMount() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  else {
    firebase.app(); // if already initialized, use that one
  }

    var loc = firebase.database().ref('Drivers/' + 1234567789 ).on('value', (snapshot) => {
      const latitude = snapshot.val().CurrentPosition.location.coords.latitude;
      const longitude = snapshot.val().CurrentPosition.location.coords.longitude;
      this.setState({lat: latitude, lng: longitude})
      console.log("Location: " + latitude + longitude);
    });

  }
 
  render() { 
    
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAI7fdb3cSLp4-TbhZsonR3Gflc8TSUXs4" }}
          defaultCenter={this.state.location}
          defaultZoom={this.state.zoom}
        >
          <AnyReactComponent
            lat={this.state.location.lat}
            lng={this.state.location.lng}
            // label={}
            text="My Marker"
          />
          
         </GoogleMapReact>
      </div>
    );
  }
}

export default MapView;