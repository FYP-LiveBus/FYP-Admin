import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import firebase from 'firebase';
import firebaseConfig from '../../firebase';
// import Marker from './Marker'
import DirectionsBusRoundedIcon from '@material-ui/icons/DirectionsBusRounded';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [
        {
          lat: 31.40151,
          lng: 74.20686
        }
      ],
      defaultLocation: {
        lat: 31.40151,
        lng: 74.20686
      },
      zoom: 11
    };
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    var loc = firebase
      .database()
      .ref(`Drivers`)
      .on('value', snapshot => {
        let location = [];
        snapshot.forEach(s => {
          location.push({
            lat: s.val().CurrentPosition.location.coords.latitude,
            lng: s.val().CurrentPosition.location.coords.longitude
          });
        });
        this.setState({ location });
        // console.log(snapshot.val())
        // const latitude = snapshot.val().CurrentPosition.location.coords
        //   .latitude;
        // const longitude = snapshot.val().CurrentPosition.location.coords
        //   .longitude;
        // this.setState({ lat: latitude, lng: longitude });
        // console.log('Location: ' + latitude + ', ' + longitude);
      });
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAI7fdb3cSLp4-TbhZsonR3Gflc8TSUXs4' }}
          defaultCenter={this.state.defaultLocation}
          defaultZoom={this.state.zoom}
        >
          {this.state.location.map(loc => (
            <DirectionsBusRoundedIcon
              fontSize="small"
              // color="grey"
              lat={loc.lat}
              lng={loc.lng}
              text="My Marker"
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapView;
