module.exports = {
  viewName: '<%- classifyName %>View',
  crud: require('./crud_<%- name %>'),
  form: require('./form_<%- name %>'),
  table: require('./table_<%- name %>')
}
