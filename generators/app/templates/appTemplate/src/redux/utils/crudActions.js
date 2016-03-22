import requester from './requester'
function requestFailure (actionTypes, error) {
  return {
    type: actionTypes.requestFailure
    payload: {
      requesting: false
      error
    }
  }
}
function startFetchList (actionTypes) {
  return {
    type: actionTypes.startFetchList,
    payload: {
      requesting: true,
      error: null
    }
  }
}
function endFetchList (actionTypes, list) {
  return {
    type: actionTypes.endFetchList,
    payload: {
      requesting: false,
      list
    }
  }
}
export function getList (module, url, success, error) {
  return (dispatch) => {
    dispatch(startFetchList(module.types))
    return requester.get(url)
          .then((res) => {
            dispatch(endFetchList(module.types, res.Data))
            if (success) success(res.Data)
          })
          .catch((err) => {
            dispatch(requestFailure(module.types, err))
            if (error) error(err)
          })
  }
}
function startFetchItem (actionTypes) {
  return {
    type: actionTypes.startFetchItem,
    payload: {
      requesting: true,
      error: null
    }
  }
}
function endFetchItem (actionTypes) {
  return {
    type: actionTypes.endFetchItem,
    payload: {
      requesting: false
    }
  }
}
export function getItem (module, url, success, error) {
  return (dispatch) => {
    dispatch(startFetchItem(module.types))
    return requester.get(url)
          .then((res) => {
            dispatch(endFetchItem(module.types))
            if (success) success(res.Data)
          })
          .catch((err) => {
            dispatch(requestFailure(module.types, err))
            if (error) error(err)
          })
  }
}
export function startEditItem (module, item) {
  if (!item) item = null
  return {
    type: module.types.startEditItem,
    payload: {
      editing: true,
      editTarget: item,
      error: null
    }
  }
}
export function endEditItem (module) {
  return {
    type: module.types.endEditItem,
    payload: {
      editing: false,
      editTarget: null
    }
  }
}
function startAddItem (actionTypes) {
  return {
    type: actionTypes.startAddItem,
    payload: {
      requesting: true,
      error: null
    }
  }
}
function endAddItem (actionTypes, newList) {
  return {
    type: actionTypes.endAddItem,
    playload: {
      list: newList,
      requesting: false
    }
  }
}
export function addItem (module, url, item, success, error) {
  return (dispatch, getState) => {
    dispatch(startAddItem(module.types))
    return requester.post(url, item)
          .then((res) => {
            const {list} = getState()[module.name]
            dispatch(endAddItem(module.types, [res.Data, ...list]))
            if (success) success(res.Data)
          })
          .catch((err) => {
            dispatch(requestFailure(module.types, err))
            if (error) error(err)
          })
  }
}
function startUpdateItem (actionTypes) {
  return {
    type: actionTypes.startUpdateItem,
    payload: {
      requesting: true,
      error: null
    }
  }
}
function endUpdateItem (actionTypes, newList) {
  return {
    type: actionTypes.endUpdateItem,
    payload: {
      requesting: false,
      list: newList
    }
  }
}
export function updateItem (module, url, item, success, error) {
  return (dispatch, getState) => {
    dispatch(startUpdateItem(module.types))
    return requester.put(url, item)
          .then((res) => {
            const {list} = getState()[module.name]
            dispatch(endUpdateItem(module.types, list.map((i) => {
              if (i[module.itemKey] === item[module.itemKey]) {
                return res.Data
              } else {
                return i
              }
            })))
            if (success) success(res.Data)
          })
          .catch((err) => {
            dispatch(requestFailure(module.types, err))
            if (error) error(err)
          })
  }
}
function startDelItem (actionTypes) {
  return {
    type: actionTypes.startDelItem,
    payload: {
      requesting: true,
      error: null
    }
  }
}
function endDelItem (actionTypes, newList) {
  return {
    type: actionTypes.endDelItem,
    payload: {
      requesting: false,
      list: newList
    }
  }
}
export function delItem (module, url, item, success, error) {
  return (dispatch, getState) => {
    dispatch(startDelItem(module.types))
    return requester.del(url)
          .then((res) => {
            const {list} = getState()[module.name]
            dispatch(endDelItem(module.types,
              list.filter((i) => i[module.itemKey] !== item[module.itemKey])))
            if (success) success(res.Data)
          })
          .catch((err) => {
            dispatch(requestFailure(module.types, err))
            if (error) error(err)
          })
  }
}
