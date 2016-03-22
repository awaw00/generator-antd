var stringify = require('json-stringify-pretty-compact')
module.exports = {
  jsonToStr (obj) {
    return JSON.stringify(obj)
          .replace(/\"/g, '\'')
          .replace(/,/g, ', ')
          .replace(/:/g, ': ')
          .replace('\'true\'', 'true')
          .replace('\'false\'', 'false')
  },
  stringify (obj) {
    return stringify(obj, {
      maxLength: 10,
      indent: 2
    })
    .replace(/\"/g, '\'')
    .replace(/,/g, ', ')
    .replace(/'\'true\''/g, 'true')
    .replace(/'\'false\''/g, 'false')
  }
}
