import React, {Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import { Component } from 'react';
 
export class MapView extends Component{

    render(){
        return (
            <Map google={this.props.google} zoom={14}>
 
                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
        
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                    <h1>{this.state.name}</h1>
                    </div>
                </InfoWindow>
          </Map>);
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyAI7fdb3cSLp4-TbhZsonR3Gflc8TSUXs4')
  })(MapView)