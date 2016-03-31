module.exports = {
  moduleName: '<%- name %>',
  keyName: 'keyName',
  pagination: true,
  urlBase: 'owner/${owner}/<%- name %>',
  urlGetItem: '${key}',
  urlGetList: '${count}/${page}',
  urlAdd: '',
  urlUpdate: '${key}',
  urlDel: '${key}'
}
