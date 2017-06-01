import React from 'react'
import PropTypes from 'prop-types'
import InputLocation from './InputLocation'
import SimpleMapExample from './testMap'
import ExampleMap from './ExampleMap'
import CustomSearchBox from './customSearchBox'

//do we need start and end feeding the input boxes? its a 1 way data flow
const BikeMap = ({start, end, bikeRoutes, handleInputChange, getBikeRoutes }) => (
  <div style={{ margin: '0 auto' }} >
    <div>
    <h2>Bike Map Routes:</h2>
    <InputLocation start={start} end={end} getBikeRoutes={getBikeRoutes} handleInputChange={handleInputChange}/>
    <SimpleMapExample />
    </div>
  </div>
);

export default BikeMap;

