import React, { Component } from 'react'
import CustomSearchBox from './customSearchBox'


class InputLocation extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.getBikeRoutes(this.props.start, this.props.end);
  }
  render(){
    const { start, end, handleInputChange } = this.props
    return (
      <div className="outer-form-container" >
      <div>
        <form>
          <ul className="flex-outer">
            <li>
              <label htmlFor="start">Start:</label>
              <CustomSearchBox name={'start'} handleInputChange={handleInputChange}/>
            </li>
            <li>
              <label htmlFor="end">End:</label>
              <CustomSearchBox name={'end'} handleInputChange={handleInputChange}/>
            </li>
            <li>
              <button type="submit" className='btn btn-primary' onClick={this.handleSubmit}>
                  Get Routes
              </button>
            </li>
          </ul>
        </form>
      </div>

    </div>
    )
  }
}

export default InputLocation;