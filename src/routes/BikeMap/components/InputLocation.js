import React from 'react'
import CustomSearchBox from './customSearchBox'

const InputLocation = ({start, end, handleInputChange, getBikeRoutes}) => (
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
            <button type="submit" className='btn btn-primary' onSubmit={getBikeRoutes}>
                Get Routes
            </button>
          </li>
        </ul>
      </form>
    </div>

  </div>
)

export default InputLocation;