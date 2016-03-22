module.exports = {
  jsonToStr (obj) {
    return JSON.stringify(obj).replace(/\"/g, '\'').replace(/,/g, ', ').replace(/:/g, ': ')
  },
  strToJson (str) {
    var obj = JSON.parse(str)
    for (var key in obj) {
      if (obj[key] === 'true') obj[key] = true
      else if (obj[key] === 'false') obj[key] = false
    }
    return obj
  }
}
