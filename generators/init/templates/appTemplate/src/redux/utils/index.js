export createActionTypes from './createActionTypes'
export createReducer from './createReducer'
export requester from './requester'
export function startRequest (type, payload) {
  return {
    type,
    payload: {
      requesting: true,
      error: null,
      ...payload
    }
  }
}
export function endRequest (type, payload) {
  return {
    type,
    payload: {
      requesting: false,
      ...payload
    }
  }
}
export function requestFailed (type, error, payload) {
  return {
    type,
    payload: {
      requesting: false,
      error,
      ...payload
    }
  }
}
