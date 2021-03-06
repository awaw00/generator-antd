module.exports = {
  modelName: '<%- modelName %>',
  modelKey: '<%- modelKey %>',
  modelFields: {
    <%_ for (var i = 0; i < modelFields.length; i++) { _%>
    <%- modelFields[i] %>: {
      form: {
        order: <%- i %>,
        type: 'text',
        label: '<%- modelFields[i] %>：',
        rules: [{required: true, message: '<%- modelFields[i] %> is required'}]
      },
      table: {
        order: <%- i %>,
        title: '<%- modelFields[i] %>'
      }
    }<%- i === modelFields.length - 1 ? '' : ',' %>
    <%_ } _%>
  },
  form: {
    name: 'ModalForm<%- modelClassifyName %>',
    newTitle: 'Add <%- modelTitleizeName %>',
    editTitle: 'Edit <%- modelTitleizeName %>',
    layout: {
      labelCol: 6,
      wrapperCol: 14
    },
    dist: 'src/components'
  },
  pagination: false,
  table: {
    name: 'Table<%- modelTitleizeName %>',
    size: 'small',
    methods: [
      {label: 'edit <%- modelName %>', name: 'edit'},
      {label: 'del <%- modelName %>', name: 'del'}
    ],
    dist: 'src/components'
  },
  crud: {
    name: '<%- modelName %>',
    baseUri: '<%- modelName %>',
    operations: {
      getItem: '${key}',
      getList: '',
      addItem: '',
      updateItem: '${key}',
      delItem: '${key}'
    },
    dist: 'src/redux/modules'
  },
  view: {
    name: '<%- modelClassifyName %>View',
    dist: 'src/views'
  }
}
