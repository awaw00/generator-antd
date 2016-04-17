import React, {PropTypes} from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
<% for (var i = 0; i < modules.length; i++) { -%>
<%- modules[i] %>
<% } -%>
<%_ states = items.map((i) => i.fieldName) _%><%_ statesStr = states.join(', ') _%>

const <%- blueprint.form.name %> = React.createClass({
  propTypes: {
    form: PropTypes.object.isRequired,
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    okHandler: PropTypes.func.isRequired,
    cancelHandler: PropTypes.func.isRequired,
    editMode: PropTypes.oneOf(['new', 'edit']).isRequired,
    editTarget: PropTypes.object // null if editMode is 'new'
  },
  getDefaultProps () {
    return {
      confirmLoading: false,
      visible: false,
      okHandler: () => {},
      cancelHandler: () => {},
      editMode: 'new',
      editTarget: null
    }
  },
  initialState: {
  <%_ for (var i = 0; i < initialStates.length; i++) { _%>
    <%- initialStates[i] %>
  <%_ } _%>
  },
  componentWillReceiveProps (nextProps) {
    const {visible, editMode, editTarget} = nextProps
    if (!visible || visible && this.props.visible) return

    if (editMode === 'new') {
      nextProps.form.resetFields()
      nextProps.form.setFieldsValue(this.initialState)
    } else {
      let newState = Object.assign({}, editTarget)
      <%_ for (var i = 0; i < items.length; i++) { _%>
        <%_ item = items[i] _%>
        <%_ if (typeof item.options === 'object') { _%>
          <%_ reverseMap = {} _%>
          <%_ for (var key in item.options) { _%>
            <%_ reverseMap[item.options[key]] = key _%>
          <%_ } _%>
      let <%- item.fieldName %>ReverseMap = <%- stringify(reverseMap) %>
      newState['<%- item.fieldName %>'] = <%- item.fieldName %>ReverseMap[newState['<%- item.fieldName %>']]
        <%_ } _%>
      <%_ } _%>
      nextProps.form.setFieldsValue(newState)
    }
  },
  onOk () {
    const {okHandler, form} = this.props
    const {validateFields} = form
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      if (!okHandler) {
        return
      }
      <%_ for (var i = 0; i < items.length; i++) { _%>
        <%_ item = items[i] _%>
        <%_ if (typeof item.options === 'object') { _%>
      const <%- item.fieldName %>Map = <%- stringify(item.options) %>
      values['<%- item.fieldName %>'] = <%- item.fieldName %>Map[values['<%- item.fieldName %>']]
        <%_ } _%>
      <%_ } _%>
      okHandler(values)
    })
  },
  render () {
    const {visible, cancelHandler, editMode, confirmLoading} = this.props
    const title = editMode === 'new' ? '<%- blueprint.form.newTitle %>' : '<%- blueprint.form.editTitle %>'
    const formLayout = {
      labelCol: {span: <%- blueprint.form.layout.labelCol ? blueprint.form.layout.labelCol : 4 %>},
      wrapperCol: {span: <%- blueprint.form.layout.wrapperCol ? blueprint.form.layout.wrapperCol : 16 %>}
    }
    const modalProps = {
      title,
      visible,
      confirmLoading,
      onCancel: cancelHandler,
      onOk: this.onOk
    }

    const {getFieldProps} = this.props.form
    <%_ for (var i = 0; i < items.length; i++) { _%>
    <%_ item = items[i] _%>
    <%_ name = item.fieldName _%>
      <%_ if (item.type === 'checkbox') { _%>
    const <%- name %>Props = getFieldProps('<%- name %>',
      {valuePropName: 'checked'<%- item.rules ? ', rules: ' + stringify(item.rules) : '' %>}
    )
      <%_ } else { _%>
    const <%- name %>Props = getFieldProps('<%- name %>'<%- item.rules ? ', {rules: ' + stringify(item.rules) + '}' : '' %>)
      <%_ } _%>
    <%_ } _%>
    return (
      <Modal {...modalProps}>
        <Form horizontal form={this.props.form}>
          <%_ for (var i = 0; i < nodes.length; i++) { _%>
          <Form.Item label='<%- items[i].label %>' {...formLayout}>
            <%- nodes[i] %>
          </Form.Item>
          <%_ } _%>
        </Form>
      </Modal>
    )
  }
})

export default Form.create()(<%- blueprint.form.name %>)
