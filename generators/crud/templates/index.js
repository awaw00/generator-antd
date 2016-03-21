import {apiUrl} from 'constants'
import {push} from 'react-router-redux'
import requester from 'redux/utils/requester'
import createActionTypes from 'redux/utils/createActionTypes'
import createReducer from 'redux/utils/createReducer'

// ----------------------------------
// action types
// ----------------------------------

<%_ PLURANAME = pluraName.toUpperCase() _%>
<%_ MODULENAME = moduleName.toUpperCase() _%>
const types = [
  '<%- PLURANAME %>_REQUEST_FAILURE',
  'START_FETCH_<%- PLURANAME %>',
  'END_FETCH_<%- PLURANAME %>',
  'START_FETCH_<%- MODULENAME %>_ITEM',
  'END_FETCH_<%- MODULENAME %>_ITEM',
  'START_EDIT_<%- MODULENAME %>',
  'END_EDIT_<%- MODULENAME %>',
  'START_ADD_<%- MODULENAME %>',
  'END_ADD_<%- MODULENAME %>',
  'START_UPDATE_<%- MODULENAME %>',
  'END_UPDATE_<%- MODULENAME %>',
  'START_DEL_<%- MODULENAME %>',
  'END_DEL_<%- MODULENAME %>'
]
export const actionTypes = createActionTypes(types)

// ----------------------------------
// actions
// ----------------------------------

export function <%- pluraName %>RequestFailure (error) {
  return {
    type: actionTypes.<%- PLURANAME %>_REQUEST_FAILURE,
    payload: {
      loading: false,
      error
    }
  }
}
export function startRequest (type) {
  return {
    type,
    payload: {
      requesting: true,
      error: null
    }
  }
}
export function endRequest (type, <%- pluraName %>) {
  return {
    type,
    payload: {
      requesting: false,
      <%- pluraName %>
    }
  }
}
export function startEdit<%- moduleName %> (editTarget) {
  let editMode = 'edit'
  if (!editTarget) {
    editTarget = null
    editMode = 'new'
  }
  return {
    type: actionTypes.START_EDIT_<%- MODULENAME %>,
    payload: {
      editing: true,
      editTarget,
      editMode
    }
  }
}
export function endEdit<%- camelModuleName %> () {
  return {
    type: actionTypes.END_EDIT_<%- MODULENAME %>,
    payload: {
      editing: false
    }
  }
}
export function get<%- camelPluraName %> (success, error) {
  return (dispatch) => {
    dispatch(startRequest(actionTypes.START_FETCH_<%- PLURANAME %>))
    return requester.get(apiUrl)
          .then((res) => {
            dispatch(endRequest(actionTypes.END_FETCH_<%- PLURANAME %>, res.Data))
            if (success) success(res)
          })
          .catch((err) => {
            dispatch(<%- pluraName %>RequestFailure(err))
            if (error) error(err)
          })
  }
}
export function get<%- camelModuleName %>Item (key, success, error) {
  return (dispatch, getState) => {
    dispatch(startRequest(actionTypes.START_FETCH_<%- MODULENAME %>_ITEM))
    return requester.get(`${apiUrl}/${key}`)
          .then((res) => {
            const {<%- pluraName %>} = getState().<%- moduleName %>
            dispatch(endRequest(actionTypes.END_FETCH_<%- MODULENAME %>_ITEM,
              <%- pluraName %>.map((i) => {
                if (i.<%- keyName %> === key) {
                  return res.Data
                } else {
                  return i
                }
              })
            ))
            if (success) success(res)
          })
          .catch((err) => {
            dispatch(<%- pluraName %>RequestFailure(err))
            if (error) error(err)
          })
  }
}
export function add<%- camelModuleName %> (<%- moduleName %>, success, error) {
  return (dispatch, getState) => {
    dispatch(startRequest(actionTypes.START_ADD_<%- MODULENAME %>))
    return requester.post(apiUrl, <%- moduleName %>)
          .then((res) => {
            const {<%- pluraName %>} = getState().<%- moduleName %>
            dispatch(endRequest(actionTypes.END_ADD_<%- MODULENAME %>, [res.Data, ...<%- pluraName %>]))
            if (success) success(res)
          })
          .catch((err) => {
            dispatch(<%- pluraName %>RequestFailure(err))
            if (error) error(err)
          })
  }
}
export function update<%- camelModuleName %> (key, <%- moduleName %>, success, error) {
  return (dispatch, getState) => {
    dispatch(startRequest(actionTypes.START_UPDATE_<%- MODULENAME %>))
    return requester.put(`${apiUrl}/${key}`, <%- moduleName %>)
          .then((res) => {
            const {<%- pluraName %>} = getState().<%- moduleName %>
            dispatch(endRequest(actionTypes.END_UPDATE_<%- MODULENAME %>,
              <%- pluraName %>.map((i) => {
                if (i.<%- keyName %> === key) {
                  return r.Data
                } else {
                  return r
                }
              })
            ))
            if (success) success(res)
          })
          .catch((err) => {
            dispatch(<%- pluraName %>RequestFailure(err))
            if (error) error(err)
          })
  }
}
export function del<%- camelModuleName %> (key, success, error) {
  return (dispatch, getState) => {
    dispatch(startRequest(actionTypes.START_DEL_<%- MODULENAME %>))
    return requester.delete(`${apiUrl}/${key}`)
          .then((res) => {
            const {<%- pluraName %>} = getState().<%- moduleName %>
            dispatch(endRequest(actionTypes.END_DEL_<%- MODULENAME %>,
              <%- pluraName %>.filter((i) => i.<%- keyName %> !== key)
            ))
            if (success) success(res)
          })
          .catch((err) => {
            dispatch(<%- pluraName %>RequestFailure(err))
            if (error) error(err)
          })
  }
}
export const actionCreators = {
  get<%- camelPluraName %>,
  get<%- camelModuleName %>Item,
  add<%- camelModuleName %>,
  update<%- camelModuleName %>,
  del<%- camelModuleName %>,
  startEdit<%- camelModuleName %>,
  endEdit<%- camelModuleName %>
}

// ----------------------------------
// action handlers
// ----------------------------------

const ACTION_HANDLERS = {
}

// ----------------------------------
// reducer
// ----------------------------------

const initialState = {
  requesting: false,
  <%- pluraName %>,
  editMode: 'new',
  editTarget: null,
  error: null
}

export default createReducer(initialState, actionTypes, ACTION_HANDLERS)
