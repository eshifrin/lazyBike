import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BikeRoute from './BikeRoute'

class RoutesList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { routes, start, end, isLoading } = this.props;
    if(isLoading) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    if(!routes.length){
      return (
        <div>
          <p>Enter your route to get started.</p>
        </div>
      )
    }
    else {
      return (
        <div style={{ margin: '0 auto' }}>
          <div>
            <h2>Bike Map Routes:</h2>
            {routes.map((route,ind) => {
              return <BikeRoute key={ind} stats={route} num={ind + 1}/>
            })}
          </div>
        </div>
      )
    }
  }
}

export default RoutesList;