module.exports = {
  moduleName: '<%- name %>',
  keyName: 'keyName',
  pagination: true,
  urlGetItem: 'owner/${owner}/<%- name %>/${key}',
  urlGetList: 'owner/${owner}/<%- name %>/${count}/${page}',
  urlAdd: 'owner/${owner}/<%- name %>',
  urlUpdate: 'owner/${owner}/<%- name %>/${key}',
  urlDel: 'owner/${owner}/<%- name %>/${key}'
}
