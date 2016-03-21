export default function createActionTypes (types) {
  return types.reduce((actionTypes, type) => {
    actionTypes[type] = type
    return actionTypes
  }, {})
}
