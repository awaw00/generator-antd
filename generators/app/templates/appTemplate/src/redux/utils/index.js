export function createActionTypes (types) {
  return types.reduce((actionTypes, type) => {
    actionTypes[type] = type
    return actionTypes
  }, {})
}
export function createReducer (initialState, actionTypes, actionHandlers) {
  return (state = initialState, action) => {
    if (actionTypes[action.type]) {
      const handler = actionHandlers[action.type]
      if (handler) {
        return handler(state, action.payload)
      } else if (action.payload) {
        return Object.assign({}, state, action.payload)
      } else {
        return state
      }
    } else {
      return state
    }
  }
}

export requester from './requester'
