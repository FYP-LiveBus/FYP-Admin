// import React, { Component } from "react";
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

// class Demo1 extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "React"
//     };
//   }

//   render() {
//     return (
//       <div>
//         <Map
//           google={this.props.google}
//           zoom={14}
//           style={mapStyles}
//           initialCenter={{
//             lat: YOUR_LATITUDE,
//             lng: YOUR_LONGITUDE
//           }}
//         >
//          <Marker
//           onClick={this.onMarkerClick}
//           name={'This is test name'}
//         />
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAI7fdb3cSLp4-TbhZsonR3Gflc8TSUXs4'
// })(Demo1);