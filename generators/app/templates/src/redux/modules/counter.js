import createActionTypes from 'redux/utils/createActionTypes'
import createReducer from 'redux/utils/createReducer'

// ------------------------------------
// Action Types
// ------------------------------------

const types = [
  'COUNTER_INCREMENT'
]

export const actionTypes = createActionTypes(types)

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value) {
  return {
    type: actionTypes.COUNTER_INCREMENT,
    payload: {
      value
    }
  }
}

export function doubleAsync () {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().counter.value))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [actionTypes.COUNTER_INCREMENT]: (state, payload) => {
    return {...state, value: state.value + payload.value}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  value: 0
}

export default createReducer(initialState, actionTypes, ACTION_HANDLERS)
