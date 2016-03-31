module.exports = {
  moduleName: '<%- name %>',
  keyName: 'keyName',
  pagination: true,
  routeBase: 'owner/${owner}/<%- name %>',
  routeGetItem: '${key}',
  routeGetList: '${count}/${page}',
  routeAdd: '',
  routeUpdate: '${key}',
  routeDel: '${key}'
}
