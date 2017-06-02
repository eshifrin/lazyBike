import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BikeRoute from './BikeRoute'

class RoutesList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let { routes, start, end, isLoading } = this.props.routes;
    
    if(isLoading) {
      <div>
        <p>Loading</p>
      </div>
    }

    if(!routes || !routes.length){
      return (
        <div>
          <p>Enter your route to get started.</p>
        </div>
      )
    }

    return (
      <div style={{ margin: '0 auto' }} >
        <div>
          <h2>Bike Map Routes:</h2>
          {routes.map(route => {
            <BikeRoute stats={route.stats} />
          })}
        </div>
      </div>
    )
  }
}

export default RoutesList;