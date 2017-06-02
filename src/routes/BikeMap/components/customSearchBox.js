//have it take in the className of node, grab global google, attach it
  //render the onchange property
  //have it take in styles
  //eventually use withGoogle 

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  render,
  findDOMNode,
  unmountComponentAtNode,
} from "react-dom";

class CustomSearchBox extends Component {
  constructor(props) {
    super(props)
    this.handleManualChange = this.handleManualChange.bind(this)
  }
  
  componentDidMount() {
    const el = findDOMNode(this);
    const searchBox = new google.maps.places.SearchBox(el)

    searchBox.addListener('places_changed', () => {
      const address = searchBox.getPlaces()[0].formatted_address;
      this.props.handleInputChange(this.props.name, address);
    });
  }

  handleManualChange(e) {
    this.props.handleInputChange(this.props.name, e.target.value)
  }

  render() {
    return (
      <input onChange={this.handleManualChange}/>
    )
  }
}

export default CustomSearchBox; 