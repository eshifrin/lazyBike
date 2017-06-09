import axios from 'axios'
// ------------------------------------
// Constants
// ------------------------------------
export const BIKEMAP_HANDLE_INPUT_CHANGE = 'BIKEMAP_HANDLE_INPUT_CHANGE'
export const BIKEMAP_GET_BIKE_ROUTES = 'BIKEMAP_GET_BIKE_ROUTES'
export const ROUTES_LOADING = 'ROUTES_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export function routesLoading(bool) {
  return {
    type: ROUTES_LOADING,
    payload: bool
  }
}
export function handleInputChange (stateVal, value) {
  return {
    type    : BIKEMAP_HANDLE_INPUT_CHANGE,
    payload : {stateProp: stateVal, value: value}
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const getBikeRoutes = (start, end) => {
//   return (dispatch) => {
//       dispatch(routesLoading(true));
//         fetch('/directions', {
//           params: {
//             start: start,
//             end: end
//           }
//         })
//         .then((response, error) => {
//           if(error){ throw new error}
//           return data.data;
//         })
//         .then(routes => dispatch({type: BIKEMAP_GET_BIKE_ROUTES, payload: routes}))
//         .then(() => dispatch(routesLoading(false)))
//         .catch((error) => console.log(error))
//     }
// }

export const getBikeRoutes = (start, end) => {
  return (dispatch) => {
      dispatch(routesLoading(true));
        fetch(`/directions?start=${start}&end=${end}`)
        .then(response => {
          if(!response.ok){
            throw Error(response.statusText);
          }
          dispatch(routesLoading(false))
          return response;
        })
        .then(response => response.json())
        .then(routes => dispatch({type: BIKEMAP_GET_BIKE_ROUTES, payload: routes}))
        .catch((error) => console.log(error))
    }
}

// export const getBikeRoutes = () => {
//   return {
//           type    : BIKEMAP_GET_BIKE_ROUTES,
//           payload : ''
//         }
// }

export const actions = {
  handleInputChange,
  getBikeRoutes,
  routesLoading
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BIKEMAP_HANDLE_INPUT_CHANGE] : (state, action) => {
    const { stateProp, value } = action.payload;
    if(stateProp === 'start'){
      return state = {
      ...state,
      start: value
      }
    } else {
      return state = {
        ...state, 
        end: value
      }
    }
    
  },

  [BIKEMAP_GET_BIKE_ROUTES] : (state, action) => {
    return state = {
      ...state,
      bikeRoutes: action.payload
    }
  },

  [ROUTES_LOADING] : (state, action) => {
    console.log(state, action.payload)
    return state = {
      ...state,
      loading: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  start: '',
  end: '',
  bikeRoutes: [],
  loading: false
}
export default function bikeMapReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
