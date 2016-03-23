module.exports = {
  jsonToStr (obj) {
    return JSON.stringify(obj)
          .replace(/\"/g, '\'')
          .replace(/,/g, ', ')
          .replace(/:/g, ': ')
          .replace('\'true\'', 'true')
          .replace('\'false\'', 'false')
  }
}
