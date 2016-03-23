import {apiUrl} from 'constants'
import createReducer from 'redux/utils/createReducer'
import crudActions from 'redux/utils/crudActions'

<%_ PLURANAME = pluraName.toUpperCase() _%>
<%_ MODULENAME = moduleName.toUpperCase() _%>
export const actionTypes = {
  requestFailure: '<%- PLURANAME %>_REQUEST_FAILURE',
  startFetchList: 'START_FETCH_<%- PLURANAME %>',
  endFetchList: 'END_FETCH_<%- PLURANAME %>',
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

function getItem (<%- hasOwner(urlGetItem) ? 'owner, ' : '' %>key, success, error) {
  return crudActions.getItem(moduleDef, `${apiUrl}/<%- urlGetItem %><%- hasKey(urlGetItem) ? '' : '/${key}' %>`, success, error)
}
function getList (<%- hasOwner(urlGetList) ? 'owner, ' : '' %>success, error) {
  return crudActions.getList(moduleDef, `${apiUrl}/<%- urlGetList %>`, success, error)
}
function startEditItem (item) {
  return crudActions.startEditItem(moduleDef.types, item)
}
function endEditItem () {
  return crudActions.endEditItem(moduleDef.types)
}
function addItem (<%- hasOwner(urlAdd) ? 'owner, ' : '' %>item, success, error) {
  return crudActions.addItem(moduleDef, `${apiUrl}/<%- urlAdd %>`, item, success, error)
}
function updateItem (<%- hasOwner(urlUpdate) ? 'owner, ' : '' %>key, item, success, error) {
  const key = item[moduleDef.itemKey]
  return crudActions.updateItem(moduleDef, `${apiUrl}/<%- urlUpdate %><%- hasKey(urlUpdate) ? '' : '/${key}' %>`, key, item, success, error)
}
function delItem (<%- hasOwner(urlDel) ? 'owner, ' : '' %>key, success, error) {
  const key = item[moduleDef.itemKey]
  return crudActions.delItem(moduleDef, `${apiUrl}/<%- urlDel %><%- hasKey(urlDel) ? '' : '/${key}' %>`, key, success, error)
}
export const actionCreators = {
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
  editMode: 'new',
  editTarget: null,
  editing: false,
  error: null
}

export default createReducer(initialState, actionTypes, ACTION_HANDLERS)
