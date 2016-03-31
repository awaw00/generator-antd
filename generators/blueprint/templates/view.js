module.exports = {
  viewName: '<%- classifyName %>View',
  crud: require('./crud_<%- fileName %>'),
  form: require('./form_<%- fileName %>'),
  table: require('./table_<%- fileName %>')
}
