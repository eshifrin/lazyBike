import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const BikeRoute = ({stats, num}) => (
  <div>
    <h3>Route: {num}</h3>
    <div>
      <div>Ascent: {stats.ascent}</div>
      <div>Descent: {stats.descent}</div>
    </div>
  </div>
)

export default BikeRoute;