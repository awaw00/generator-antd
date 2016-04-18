import {apiUrl} from 'constants'
import createReducer from 'redux/utils/createReducer'
import crudActions, {createCrudActionTypes} from 'redux/utils/crudActions'

<%_ PLURANAME = pluraName.toUpperCase() _%>
<%_ MODULENAME = moduleName.toUpperCase() _%>
export const actionTypes = {
  requestFailure: '<%- MODULENAME %>_REQUEST_FAILURE',
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

<%_ for (var key in operations) { _%>
  <%_ if (['getItem', 'getList', 'addItem', 'updateItem', 'delItem'].indexOf(key) < 0) { _%>
    <%_ continue _%>
  <%_ } else { _%>
    <%_ var uri = operations[key] _%>
    <%_ var re = new RegExp(/\$\{(.*?)\}/) _%>
    <%_ var match = re.exec(uri) _%>
    <%_ var params = new Set() _%>
    <%_ while (match !== null) { _%>
      <%_ params.add(match[1]) _%>
      <%_ uri = uri.substring(match.index + match[0].length) _%>
      <%_ match = re.exec(uri) _%>
    <%_ } _%>
    <%_ params = Array.from(params) _%>
function <%- key %> (<%- params.join(', ') %><%- params.length === 0 ? '' : ', ' %>success, error) {
  <%_ var requestUri = [baseUri, operations[key]].join('/').replace(/^\//, '').replace(/\/$/, '') _%>
  <%_ if (key === 'getList' && pagination) { _%>
  return crudActions.<%- key %><%- pagination ? 'OfPage' : '' %>(moduleDef, `${apiUrl}/<%- requestUri %>`, success, error)
  <%_ } else { _%>
  return crudActions.<%- key %>(moduleDef, `${apiUrl}/<%- requestUri %>`, success, error)
  <%_ } _%>
}
  <%_ } _%>
<%_ } _%>
function startEditItem (item) {
  return crudActions.startEditItem(moduleDef, item)
}
function endEditItem () {
  return crudActions.endEditItem(moduleDef)
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
  <%_ if (pagination) { _%>
  total: 0,
  <%_ } _%>
  editMode: 'new',
  editTarget: null,
  editing: false,
  error: null
}

export default createReducer(initialState, createCrudActionTypes(actionTypes), ACTION_HANDLERS)
