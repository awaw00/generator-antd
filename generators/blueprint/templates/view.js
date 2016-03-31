module.exports = {
  viewName: '<%- classifyName %>View',
  crud: require('./crud_<%- underscoreName %>'),
  form: require('./form_<%- underscoreName %>'),
  table: require('./table_<%- underscoreName %>')
}
