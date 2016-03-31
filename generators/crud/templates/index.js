import {apiUrl} from 'constants'
import createReducer from 'redux/utils/createReducer'
import crudActions, {createCrudActionTypes} from 'redux/utils/crudActions'

<%_ PLURANAME = pluraName.toUpperCase() _%>
<%_ MODULENAME = moduleName.toUpperCase() _%>
export const actionTypes = {
  requestFailure: '<%- PLURANAME %>_REQUEST_FAILURE',
  <%_ if (hasOwner) { _%>
  setOwner: 'SET_<%- PLURANAME %>_OWNER',
  <%_ } _%>
  <%_ if (pagination) { _%>
  startFetchListOfPage: 'START_FETCH_<%- PLURANAME %>_OF_PAGE',
  endFetchListOfPage: 'END_FETCH_<%- PLURANAME %>_OF_PAGE',
  <%_ } else { _%>
  startFetchList: 'START_FETCH_<%- PLURANAME %>',
  endFetchList: 'END_FETCH_<%- PLURANAME %>',
  <%_ } _%>
  startFetchItem: 'START_FETCH_<%- MODULENAME %>_ITEM',
  endFetchItem: 'END_FETCH_<%- MODULENAME %>_ITEM',
  startEditItem: 'START_EDIT_<%- MODULENAME %>',
  endEditItem: 'END_EDIT_<%- MODULENAME %>',
  startAddItem: 'START_ADD_<%- MODULENAME %>',
  endAddItem: 'END_ADD_<%- MODULENAME %>',
  startUpdateItem: 'START_UPDATE_<%- MODULENAME %>',
  endUpdateItem: 'END_UPDATE_<%- MODULENAME %>',
  startDelItem: 'START_DEL_<%- MODULENAME %>',
  endDelItem: 'END_DEL_<%- MODULENAME %>'
}

const moduleDef = {
  name: '<%- moduleName %>',
  itemKey: '<%- keyName %>',
  types: actionTypes
}

function getItem (key, success, error) {
  <%_ if (hasOwner) { _%>
  return (dispatch, getState) => {
    const {owner} = getState().<%- moduleName %>
    dispatch(crudActions.getItem(moduleDef, `${apiUrl}/<%- getRoute(routeGetItem) %><%- hasKey(routeGetItem) ? '' : '/${key}' %>`, success, error))
  }
  <%_ } else { _%>
  return crudActions.getItem(moduleDef, `${apiUrl}/<%- getRoute(routeGetItem) %><%- hasKey(routeGetItem) ? '' : '/${key}' %>`, success, error)
  <%_ } _%>
}
function getList (<%- pagination ? 'page, count, ' : '' %>success, error) {
  <%_ if (hasOwner) { _%>
  return (dispatch, getState) => {
    const {owner} = getState().<%- moduleName %>
    dispatch(crudActions.getList<%- pagination ? 'OfPage' : '' %>(moduleDef, `${apiUrl}/<%- getRoute(routeGetList) %>`, success, error))
  }
  <%_ } else { _%>
  return crudActions.getList<%- pagination ? 'OfPage' : '' %>(moduleDef, `${apiUrl}/<%- getRoute(routeGetList) %>`, success, error)
  <%_ } _%>
}
function startEditItem (item) {
  return crudActions.startEditItem(moduleDef, item)
}
function endEditItem () {
  return crudActions.endEditItem(moduleDef)
}
function addItem (item, success, error) {
  <%_ if (hasOwner) { _%>
  return (dispatch, getState) => {
    const {owner} = getState().<%- moduleName %>
    dispatch(crudActions.addItem(moduleDef, `${apiUrl}/<%- getRoute(routeAdd) %>`, item, success, error))
  }
  <%_ } else { _%>
  return crudActions.addItem(moduleDef, `${apiUrl}/<%- getRoute(routeAdd) %>`, item, success, error)
  <%_ } _%>
}
function updateItem (key, item, success, error) {
  <%_ if (hasOwner) { _%>
  return (dispatch, getState) => {
    const {owner} = getState().<%- moduleName %>
    dispatch(crudActions.updateItem(moduleDef, `${apiUrl}/<%- getRoute(routeUpdate) %><%- hasKey(routeUpdate) ? '' : '/${key}' %>`, key, item, success, error))
  }
  <%_ } else { _%>
  return crudActions.updateItem(moduleDef, `${apiUrl}/<%- getRoute(routeUpdate) %><%- hasKey(routeUpdate) ? '' : '/${key}' %>`, key, item, success, error)
  <%_ } _%>
}
function delItem (key, success, error) {
  <%_ if (hasOwner) { _%>
  return (dispatch, getState) => {
    const {owner} = getState().<%- moduleName %>
    dispatch(crudActions.delItem(moduleDef, `${apiUrl}/<%- getRoute(routeDel) %><%- hasKey(routeDel) ? '' : '/${key}' %>`, key, success, error))
  }
  <%_ } else { _%>
  return crudActions.delItem(moduleDef, `${apiUrl}/<%- getRoute(routeDel) %><%- hasKey(routeDel) ? '' : '/${key}' %>`, key, success, error)
  <%_ } _%>
}
<%_ if (hasOwner) { _%>
function setOwner (owner) {
  return {
    type: actionTypes.setOwner,
    payload: {
      owner
    }
  }
}
<%_ } _%>
export const actionCreators = {
  <%_ if (hasOwner) { _%>
  setOwner,
  <%_ } _%>
  getItem,
  getList,
  addItem,
  updateItem,
  delItem,
  startEditItem,
  endEditItem
}

const ACTION_HANDLERS = {
}

const initialState = {
  requesting: false,
  list: [],
  <%_ if (pagination) { _%>
  total: 0,
  <%_ } _%>
  <%_ if (hasOwner) { _%>
  owner: '',
  <%_ } _%>
  editMode: 'new',
  editTarget: null,
  editing: false,
  error: null
}

export default createReducer(initialState, createCrudActionTypes(actionTypes), ACTION_HANDLERS)
