import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// let samplePath = 
//   [{
//         "lat": 37.7690564,
//         "lng": -122.4506363
//       },
//       {
//         "lat": 37.7695354,
//         "lng": -122.4507359
//       },
//       {
//         "lat": 37.7696002,
//         "lng": -122.450244
//       },
//       {
//         "lat": 37.770529,
//         "lng": -122.4504334
//       },
//       {
//         "lat": 37.7739163,
//         "lng": -122.4238142
//       },
//       {
//         "lat": 37.7767142,
//         "lng": -122.4243971
//       },
//       {
//         "lat": 37.7766779,
//         "lng": -122.4246641
//       },
//       {
//         "lat": 37.777618,
//         "lng": -122.4248359
//       },
//       {
//         "lat": 37.7784944,
//         "lng": -122.4182568
//       },
//       {
//         "lat": 37.7831079,
//         "lng": -122.419195
//       },
//       {
//         "lat": 37.7844603,
//         "lng": -122.4085608
//       },
//       {
//         "lat": 37.7840081,
//         "lng": -122.408092
//       },
//       {
//         "lat": 37.7834842,
//         "lng": -122.4087433
//       }];

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const SimpleMapExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.routes[0].steps[0]}
    >
 <Polyline
    path={props.routes[0].steps}
    options={{
      strokeColor: 'red',
      strokeWeight: 6
    }}
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
    defaultZoom={16}
    defaultCenter={{
    "lat": 37.7695354,
    "lng": -122.4507359
  }}> 
  </GoogleMap>
));

class SimpleMapExample extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { routes, start, end } = this.props
    if(routes.length) {
      return (
        <SimpleMapExampleGoogleMap 
          routes={routes}
          start={start}
          end={end}
          containerElement={
            <div style={{ height: `1000px` }} />
          }
          mapElement={
            <div style={{ height: `1000px` }} />
          }
        />
      );
    } else {
      return (
        <DefaultGoogleMap
        containerElement={
              <div style={{ height: `1000px` }} />
            }
        mapElement={
          <div style={{ height: `1000px` }} />
        }
        />
      );
    }
  }
}

export default SimpleMapExample;