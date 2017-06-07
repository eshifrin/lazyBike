import { withGoogleMap, GoogleMap, Marker, Polyline, InfoWindow } from "react-google-maps";
import React, { Component } from 'react';
import {
  render,
  findDOMNode,
  unmountComponentAtNode,
} from "react-dom";


// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    bounds={props.bounds}
    >
  <Marker
    position={props.routes[0].steps[0]}
  />
 <Polyline
    path={props.routes[0].steps}
    options={{
      strokeColor: 'red',
      strokeWeight: 6
    }}
    onMouseOver={props.handleMouseOver}
  />
  {props.iWindow.Z > 0 && (<InfoWindow
    position={props.iWindow.position}
    zIndex={props.iWindow.Z}
    onClickClose={props.handleClose}
    >
    <div>Elevation: {props.iWindow.elevation}</div>
    </InfoWindow>)}
   <Marker
    position={props.routes[0].steps[props.routes[0].steps.length - 1]}
  />
 <Polyline
    path={props.routes[1].steps}
    options={{
      strokeColor: 'red',
      strokeOpacity: .25,
      strokeWeight: 4
    }}
  />
 <Polyline
    path={props.routes[2].steps}
    options={{
      strokeColor: 'red',
      strokeOpacity: .25,
      strokeWeight: 4
    }}
  />
  </GoogleMap>
));

const DefaultGoogleMap = withGoogleMap(props => (
  <GoogleMap
  ref={props.onMapMounted}
    defaultZoom={12}
    defaultCenter={{
    "lat": 37.7695354,
    "lng": -122.4507359
  }}> 
  </GoogleMap>
));

class SimpleMapExample extends Component {
  constructor(props){
    super(props);
    this.state = {
      bounds: null,
      iWindow: {
        position: {
          lat: 0,
          lng: 0
        },
        Z: 100,
        elevation: null
      }
    }
    this.handleMapMounted = this.handleMapMounted.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // handlePolyLine(map){
  //   this._polyLine = map;
  //   const { mainRoute } = this.props.routes[0];
  //   let elevMap = new google.maps.ElevationService();
  //   let eachElev = [];
  //   let totalAscent = 0;

  //   elevMap.getElevationForLocations({
  //     locations: mainRoute.steps
  //     }, (results, status) => {
  //       results.forEach(result => eachElev.push(result))
  //       totalAscent += result.elevation;
  //     });

  //   let heatMapData = [];
  //   mainRoute.steps.forEach((step, i) => {
  //     heatMapData.push({location: new google.maps.LatLng(step.lat, step.lng), weight: eachElev.elevation[i] / totalAscent })
  //   })
  //   let heatmap = new google.maps.visualization.HeatmapLayer({
  //     data: heatMapData
  //   });
  //   console.log(heatmap);
  // }

  handleMouseOver(poly){
    let currLocation = {
      lat: poly.latLng.lat(),
      lng: poly.latLng.lng()
    }
    
    let elevMap = new google.maps.ElevationService;
    let elevationPoint = new Promise((resolve, reject) => {
      return elevMap.getElevationForLocations({
      locations: [currLocation]
      }, (results, status) => {
        resolve(results[0].elevation)
      })
    })
    elevationPoint.then(results => {
      this.setState({
        iWindow: {
          position: currLocation,
          Z: 100,
          elevation: Math.round(results)
        }
      })
    })
  }
  // handleClose(){
    // let { iWindow } = this.state;
    // this.setState({
    //   iWindow: {
    //     ...iWindow,
    //     Z: -100
    //   }
    // }, () => {
    //   console.log(this.state)
    // })
  // }
  handleMapMounted(map) {
    this._map = map;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(!nextProps.routes.length){
      return false;
    }
    return true;
  }
  componentDidMount(){
    
  }
  componentDidUpdate(prevProps, prevState) {
    const { routes } = this.props
    let arrBounds = [];
    routes.forEach(route => {
      route.steps.forEach(step => {
        let { lat, lng } = step
        arrBounds.push(new google.maps.LatLng(lat, lng))
      })
    })

    let newBounds = new google.maps.LatLngBounds();
    arrBounds.forEach(bound => {
      newBounds.extend(bound);
    })

    this._map.fitBounds(newBounds);
  }

  handleBoundsChanged(map) {
    this.setState({
      bounds: this._map.getBounds()
    })
  }

  render() {
    let { routes, start, end } = this.props
    if(routes.length) {
      return (
        <SimpleMapExampleGoogleMap 
          onMapMounted={this.handleMapMounted}
          routes={routes}
          start={start}
          end={end}
          handleClose={this.handleClose}
          iWindow={this.state.iWindow}
          handleMouseOver={this.handleMouseOver}
          bounds={this.state.bounds}
          onBoundsChanged={this.handleBoundsChanged}
          containerElement={
            <div style={{ height: `1000px`}} />
          }
          mapElement={
            <div style={{ height: `1000px` }} />
          }
        />
      );

    } else {
      return (
        <DefaultGoogleMap
        onMapMounted={this.handleMapMounted}
        containerElement={
              <div style={{ height: `1000px`}} />
            }
        mapElement={
          <div style={{ height: `1000px`}} />
        }
        />
      );
    }
  }
}

export default SimpleMapExample;