module.exports = {
  tableName: 'Table<%- classifyName %>',
  keyName: '<%- classifyName %>ID',
  size: 'small',
  pagination: false,
  cols: [
    {title: 'Name', dataIndex: 'name'},
    {title: 'Sex', renderAs: 'r.sex === 1 ? "male" : "female"'}
  ],
  methods: [
    {label: 'Edit', name: 'edit'},
    {label: 'Del', name: 'del'}
  ]
}
